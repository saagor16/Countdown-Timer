import React, { useEffect, useRef, useState } from "react";

function CountdownTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const intervalRef = useRef(null);

  const handleInput = (event) => {
    const inputTime = parseInt(event.target.value * 60) || 0;
    setInputValue(event.target.value);
    if (!isActive) setTime(inputTime);
  };

  const handleStart = () => {
    if (time > 0) {
      setIsActive(true);
      setIsPause(false);
    }
  };

  const handlePause = () => {
    setIsPause(!isPause);
    if (isPause) setIsActive(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPause(false);
    setTime(0);
    setInputValue("");
  };

  const formatTime = () => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleKeyPress = (event) => {
    const allowedKeys = /^[0-9]*$/;
    if (!allowedKeys.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (isActive && !isPause && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      alert("Time is up!");
      setInputValue("");
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 font-sans">
      {/* হেডার সেন্টার করা */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center shadow-sm">
        ⏳ Countdown Timer
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 md:w-96">
        {/* ইনপুট ফিল্ড সেন্টার করা */}
        <input
          type="text"
          className="block w-full px-4 py-3 text-lg border border-gray-300 rounded-lg mb-4 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Enter time in minutes"
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          value={inputValue}
          disabled={isActive}
        />
        <div className="text-6xl font-mono text-blue-600 mb-6 border-4 border-blue-300 rounded-lg p-4 bg-blue-50 shadow-inner text-center">
          {formatTime()}
        </div>
        <div className="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleStart}
            className={`w-full md:w-32 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isActive && !isPause
                ? "bg-blue-300 text-gray-800 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
            }`}
            disabled={isActive && !isPause}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className={`w-full md:w-32 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isActive
                ? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-md"
                : "bg-yellow-300 text-gray-800 cursor-not-allowed"
            }`}
            disabled={!isActive}
          >
            {isPause ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleReset}
            className="w-full md:w-32 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-white shadow-md transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
