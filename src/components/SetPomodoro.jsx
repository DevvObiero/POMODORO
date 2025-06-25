import React, { useContext, useState } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const SetPomodoro = () => {
  const { executing, updateExecute } = useContext(SettingsContext);

  const defaultTimer = {
    work: 25,
    short: 5,
    long: 15,
    active: 'work',
    timerSound: 'silent',
    finishSound: 'bell',
  };

  const [newTimer, setNewTimer] = useState({ ...defaultTimer, ...executing });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'timerSound' || name === 'finishSound') {
      setNewTimer({ ...newTimer, [name]: value });
    } else {
      setNewTimer({ ...newTimer, [name]: parseInt(value) || 0 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExecute(newTimer);
  };

  return (
    <div className="form-container">
      <form noValidate onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            className="input"
            type="number"
            name="work"
            placeholder="Work"
            onChange={handleChange}
            value={newTimer.work}
            min="1"
          />
          <input
            className="input"
            type="number"
            name="short"
            placeholder="Short Break"
            onChange={handleChange}
            value={newTimer.short}
            min="1"
          />
          <input
            className="input"
            type="number"
            name="long"
            placeholder="Long Break"
            onChange={handleChange}
            value={newTimer.long}
            min="1"
          />
        </div>
        <div className="sound-settings">
          <label>Timer sound</label>
          <select name="timerSound" value={newTimer.timerSound} onChange={handleChange}>
            <option value="silent">Silent</option>
            <option value="ticking">Ticking</option>
            <option value="lofi">Lo-fi</option>
          </select>
          <label>Finish sound</label>
          <select name="finishSound" value={newTimer.finishSound} onChange={handleChange}>
            <option value="bell">Bell</option>
            <option value="voice">Voice</option>
          </select>
        </div>
        <button type="submit">Set Timer</button>
      </form>
    </div>
  );
};

export default SetPomodoro;