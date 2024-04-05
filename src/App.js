import React, { useState, useEffect } from 'react';
import { ReactDOM } from 'react';
import './App.css';



function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(1500);
  const [intervalID, setIntervalID] = useState(null);

  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  };

  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  };

  const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  };

  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  };

  const handleReset = () => {
    clearInterval(intervalID);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("Session");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
      setPlay(!play);
  };

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      if (play && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        if (timingType === "Session") {
          setTimeLeft(breakLength * 60);
          setTimingType("Break");
        } else {
          setTimeLeft(sessionLength * 60)
          setTimingType("Session")
        }
        const audio = document.getElementById("beep");
        audio.play()
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, [play, timeLeft, breakLength, sessionLength, timingType]);
  
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "Session" ? "Session" : "Break";

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>

      <div className="break-length">
        <h3 id="break-label"><strong>Break Length</strong></h3>
        <button class="btn-level" disabled={play} id="break-increment" 
          onClick={handleBreakIncrease}>
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        <div class="btn-level" id="break-length">
          <strong>{breakLength}</strong>
        </div>
        <button class="btn-level" disabled={play} id="break-decrement" 
          onClick={handleBreakDecrease}>
          <i class="fa-solid fa-arrow-down"></i>
        </button>
      </div>

      <div className="session-length">
        <h3 id="session-label"><strong>Session Length</strong></h3>
        <button class="btn-level" disabled={play} id="session-increment" 
          onClick={handleSessionIncrease}>
          <i class="fa-solid fa-arrow-up"></i>
          </button>
        <div class="btn-level" id="session-length">
          <strong>{sessionLength}</strong>
        </div>
        <button class="btn-level" disabled={play} id="session-decrement" 
          onClick={handleSessionDecrease}>
          <i class="fa-solid fa-arrow-down"></i>  
        </button>
      </div>

      <div className="timer">
        <h2 id="timer-label"><strong>{title}</strong></h2>
        <h3 id="time-left">{timeFormatter()}</h3>
      </div>

      <div className="btn">
        <button id="start_stop" onClick={handlePlay}>
          <i class="fa-solid fa-play"></i>
          <i class="fa-solid fa-pause"></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
      <audio id="beep" preload="auto" 
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
