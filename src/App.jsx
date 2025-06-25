import React, { useEffect, useContext } from "react";
import Button from "./components/Button";
import CountdownAnimation from "./components/CountdownAnimation";
import SetPomodoro from "./components/SetPomodoro";
import { SettingsContext } from "./context/SettingsContext";

const App = () => {
  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
    playTimerSound,
    pauseTimerSound,
  } = useContext(SettingsContext);

  useEffect(() => {
    console.log("Pomodoro:", pomodoro, "Executing:", executing); // Debug log
    // Removed updateExecute to prevent unintended state resets
  }, [executing, startAnimate]);

  useEffect(() => {
    if (startAnimate) {
      playTimerSound();
    } else {
      pauseTimerSound();
    }
  }, [startAnimate, executing.timerSound, playTimerSound, pauseTimerSound]);

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      <small className="bomboclat">Maximize your Productivity</small>
      {pomodoro !== 0 ? (
        <>
          <ul className="labels">
            <li>
              <Button
                title="Work"
                activeClass={executing.active === "work" ? "active-label" : undefined}
                _callback={() => setCurrentTimer("work")}
              />
            </li>
            <li>
              <Button
                title="Short Break"
                activeClass={executing.active === "short" ? "active-label" : undefined}
                _callback={() => setCurrentTimer("short")}
              />
            </li>
            <li>
              <Button
                title="Long Break"
                activeClass={executing.active === "long" ? "active-label" : undefined}
                _callback={() => setCurrentTimer("long")}
              />
            </li>
          </ul>
          <Button title="Settings" _callback={SettingsBtn} />
          <div className="center-block">
            <div className="timer-container">
              <div className="time-wrapper">
                <CountdownAnimation
                  key={pomodoro}
                  timer={pomodoro}
                  animate={startAnimate}
                >
                  {children}
                </CountdownAnimation>
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                title="Start"
                className="start"
                activeClass={!startAnimate ? "active" : undefined}
                _callback={startTimer}
              />
              <Button
                title="Pause"
                className="pause"
                activeClass={startAnimate ? "active" : undefined}
                _callback={pauseTimer}
              />
            </div>
          </div>
        </>
      ) : (
        <SetPomodoro />
      )}
    </div>
  );
};

export default App;