import { useState, useEffect } from 'react';
import '../styles/Notification.css';

function Notification({ show, songTitle, songArtist }) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Mostrar por 3 segundos
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className={`notification ${isVisible ? 'notification-show' : 'notification-hide'}`}>
      <div className="notification-content">
        <div className="notification-icon">🎵</div>
        <div className="notification-text">
          <div className="notification-title">{songTitle}</div>
          <div className="notification-artist">{songArtist}</div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
