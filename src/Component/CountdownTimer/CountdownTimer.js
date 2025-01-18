import React, { useState } from 'react'
import './CountdownTimer.css'

function CountdownTimer() {
  const[time,setTime]=useState(0);

  const handleInput=(event)=>{
    setTime(parseInt(event.target.value*60))
  }

  const formatTime=()=>{
    const min =String(Math.floor(time/60).padStart(2,0))
  }
  return (
    <div className='countdown-timer'>
      <h1>Countdown Timer</h1>
      <div className='timer-display'>
        <input type='number' placeholder='Enter time in minutes' onChange={handleInput}></input>
        <div>{formatTime()}</div>
        <div className='timer-controls'>
            <button>Start</button>
            <button>Pause</button>
            <button>reset</button>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
