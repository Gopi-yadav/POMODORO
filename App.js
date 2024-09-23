import React, { useState, useEffect, useRef } from 'react';
import './App.css';


const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Start the timer
  const startTimer = () => {
    if (isRunning) return; // Prevent starting if already running
    setIsRunning(true);
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pause the timer
  const pauseTimer = () => {
    if (!isRunning) return; // Prevent pausing if not running
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(true);
  };

  // Resume the timer
  const resumeTimer = () => {
    if (!isPaused) return; // Prevent resuming if not paused
    startTimer();
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(25 * 60); // Reset to 25 minutes
    setIsRunning(false);
    setIsPaused(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-container">
      <h1>Pomodoro Timer</h1>
      <p style={{ fontSize: '48px', margin: '20px',color:'white'}}>{formatTime(seconds)}</p>
      {!isRunning && !isPaused && <button onClick={startTimer} style={{ backgroundColor: 'white',color:'black' }}>Play</button>}
      {isRunning && <button onClick={pauseTimer} style={{ backgroundColor: 'white',color:'black' }}>Pause</button>}
      {isPaused && <button onClick={resumeTimer} style={{ backgroundColor: 'white',color:'black' }}>Resume</button>}
      <button onClick={resetTimer} style={{ marginLeft: '10px', backgroundColor: 'white',color:'black' }}>Reset</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <PomodoroTimer />
    </div>
  );
}

export default App;
