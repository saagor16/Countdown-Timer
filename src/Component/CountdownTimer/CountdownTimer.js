import React from 'react'
import './CountdownTimer.css'

function CountdownTimer() {
  return (
    <div className='countdown-timer'>
      <h1>Countdown Timer</h1>
      <div className='timer-display'>
        <input type='number' placeholder='Enter time in minutes'></input>
        <div>00:00</div>
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
