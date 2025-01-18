import React, { useEffect, useRef, useState } from "react";

function CountdownTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [inputValue, setInputValue] = useState(""); // ইনপুট ফিল্ড ক্লিয়ার করার জন্য স্টেট
  const intervalRef = useRef(null);

  const handleInput = (event) => {
    const inputTime = parseInt(event.target.value * 60) || 0;
    setInputValue(event.target.value); // ইনপুট ভ্যালু সংরক্ষণ
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
    setInputValue(""); // ইনপুট ফিল্ড ক্লিয়ার করা
  };

  const formatTime = () => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleKeyPress = (event) => {
    const allowedKeys = /^[0-9]*$/; // শুধুমাত্র সংখ্যা অনুমোদিত
    if (!allowedKeys.test(event.key)) {
      event.preventDefault(); // অন্য কোনো কী নিষিদ্ধ
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
      setInputValue(""); // সময় শেষ হলে ইনপুট ফিল্ড ক্লিয়ার করা
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Countdown Timer</h1>
      <div className="flex flex-col items-center w-full">
        <input
          type="text" // "number" এর পরিবর্তে "text" ব্যবহার করা
          className="block w-64 px-4 py-2 text-lg border border-gray-300 rounded-md mb-4 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter time in minutes"
          onChange={handleInput}
          onKeyPress={handleKeyPress} // নেগেটিভ বা অ-সংখ্যা কী নিষিদ্ধ
          value={inputValue} // ইনপুট ফিল্ডে ভ্যালু যোগ করা
          disabled={isActive}
        />
        <div className="text-5xl font-mono text-blue-600 mb-6">{formatTime()}</div>
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <button
            onClick={handleStart}
            className={`w-32 h-12 px-6 py-3 rounded-lg font-semibold ${
              isActive && !isPause
                ? "bg-blue-300 text-gray-800 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={isActive && !isPause}
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className={`w-32 h-12 px-6 py-3 rounded-lg font-semibold ${
              isActive
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-yellow-300 text-gray-800 cursor-not-allowed"
            }`}
            disabled={!isActive}
          >
            {isPause ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleReset}
            className="w-32 h-12 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
