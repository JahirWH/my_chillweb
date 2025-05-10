import React, { useState, useEffect } from 'react';
import './Info.css';
import imgtaco from './assets/taco.png';

function Info({ progress, currentTime, duration, onProgressClick, onPlayClick }) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let interval;
    if (onPlayClick) {
      interval = setInterval(() => {
        setProgressValue((prev) => (prev < 100 ? prev + 1 : 0));
      }, 100); // Incrementa cada 100ms
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [onPlayClick]);

  return (
    <div className="progress-container" onClick={onProgressClick}>
      <div className="container_img">
        <img
          className="img_mov"
          src={imgtaco}
          style={{ transform: `translateX(${progressValue}%)` }}
          alt="Progreso"
        />
      </div>
    </div>
  );
}

export default Info;