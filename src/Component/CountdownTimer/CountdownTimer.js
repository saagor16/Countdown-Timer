import React, { useEffect, useRef, useState } from "react";
import "./CountdownTimer.css";

function CountdownTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const intervalRef = useRef(null);

  const handleInput = (event) => {
    setTime(parseInt(event.target.value * 60) || 0);
  };

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPause(false);
  };

  const handlePause = () => {
    setIsPause(true);
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPause(false);
    setTime(0);
  };

  useEffect(() => {
    if (isActive && !isPause && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      alert("Time is up!");
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>
      <div className="timer-display">
        <input
          type="number"
          placeholder="Enter time in minutes"
          onChange={handleInput}
        />
        <div className="time">{formatTime()}</div>
        <div className="timer-controls">
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
