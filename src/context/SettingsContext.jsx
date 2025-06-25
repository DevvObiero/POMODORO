import { useState, createContext, useRef, useEffect } from 'react';

export const SettingsContext = createContext();

function SettingsContextProvider(props) {
  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({
    work: 25,
    short: 5,
    long: 15,
    active: 'work',
    timerSound: 'silent',
    finishSound: 'bell',
  });
  const [startAnimate, setStartAnimate] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);
  const [totalSessions] = useState(4);

  const timerAudioRef = useRef(new Audio());
  const finishAudioRef = useRef(new Audio());

  const updateSessionDisplay = () => {
    const sessionDisplay = document.getElementById('session-display');
    if (sessionDisplay) {
      sessionDisplay.textContent = `${sessionCount}/${totalSessions}`;
    }
  };

  useEffect(() => {
    const handleReset = () => {
      setExecuting({
        work: 25,
        short: 5,
        long: 15,
        active: 'work',
        timerSound: 'silent',
        finishSound: 'bell',
      });
      setPomodoro(0);
      setStartAnimate(false);
      setSessionCount(1);
      updateSessionDisplay();
      pauseTimerSound();
    };

    window.addEventListener('resetPomodoro', handleReset);
    return () => window.removeEventListener('resetPomodoro', handleReset);
  }, []);

  useEffect(() => {
    updateSessionDisplay();
  }, [sessionCount]);

  function setCurrentTimer(active_state) {
    updateExecute({
      ...executing,
      active: active_state,
    });
  }

  function startTimer() {
    setStartAnimate(true);
  }

  function pauseTimer() {
    setStartAnimate(false);
  }

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const SettingsBtn = () => {
    setExecuting({
      work: 25,
      short: 5,
      long: 15,
      active: 'work',
      timerSound: 'silent',
      finishSound: 'bell',
    });
    setPomodoro(0);
    setSessionCount(1);
    updateSessionDisplay();
  };

  const updateExecute = updatedSettings => {
    setExecuting(updatedSettings);
    setTimerTime(updatedSettings);
  };

  const setTimerTime = evaluate => {
    switch (evaluate.active) {
      case 'work':
        setPomodoro(evaluate.work);
        break;
      case 'short':
        setPomodoro(evaluate.short);
        break;
      case 'long':
        setPomodoro(evaluate.long);
        break;
      default:
        setPomodoro(0);
        break;
    }
  };

  function stopAimate() {
    setStartAnimate(false);
    if (executing.active === 'work') {
      if (sessionCount < totalSessions) {
        setCurrentTimer('short');
        setSessionCount(prev => prev + 1);
      } else {
        setCurrentTimer('long');
        setSessionCount(1);
      }
    } else if (executing.active === 'short' || executing.active === 'long') {
      setCurrentTimer('work');
    }
  }

  const playTimerSound = () => {
    if (executing.timerSound !== 'silent') {
      timerAudioRef.current.src = `/sounds/${executing.timerSound}.mp3`;
      timerAudioRef.current.loop = true;
      timerAudioRef.current.play().catch(error => console.error('Error playing timer sound:', error));
    }
  };

  const pauseTimerSound = () => {
    timerAudioRef.current.pause();
    timerAudioRef.current.currentTime = 0;
  };

  const playFinishSound = () => {
    if (executing.finishSound === 'bell') {
      finishAudioRef.current.src = '/sounds/bell.mp3';
      finishAudioRef.current.play().catch(error => console.error('Error playing finish sound:', error));
    } else if (executing.finishSound === 'voice') {
      finishAudioRef.current.src =
        executing.active === 'work' ? '/sounds/voice_work_finish.mp3' : '/sounds/voice_break_finish.mp3';
      finishAudioRef.current.play().catch(error => console.error('Error playing finish sound:', error));
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        pomodoro,
        executing,
        updateExecute,
        startAnimate,
        startTimer,
        pauseTimer,
        children,
        SettingsBtn,
        setCurrentTimer,
        stopAimate,
        playTimerSound,
        pauseTimerSound,
        playFinishSound,
        sessionCount,
        totalSessions,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;