import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';
import '../styles/Player.css';

// Ejemplo de lista de canciones (reemplazar con tus propios datos)
const songs = [
  { title: "Canción 1", url: "https://res.cloudinary.com/dr9van0op/video/upload/v1745559344/Y_O_K_O_H_A_M_A_1_9_8_0_-_Discover_80_s_Japanese_Funk__%E6%97%A5%E6%9C%AC%E3%81%AE%E3%83%95%E3%82%A1%E3%83%B3%E3%82%AF_Playlist_6_7iVx_NjtPj0_owd12f.mp3" },
  { title: "Canción 2", url: "https://res.cloudinary.com/dr9van0op/video/upload/v1745559326/Your_Signal_in_the_Stars_bQvfCzNpQ00_fqdnbr.mp3" },
  { title: "Canción 3", url: "https://res.cloudinary.com/dr9van0op/video/upload/v1745559344/Y_O_K_O_H_A_M_A_1_9_8_0_-_Discover_80_s_Japanese_Funk__%E6%97%A5%E6%9C%AC%E3%81%AE%E3%83%95%E3%82%A1%E3%83%B3%E3%82%AF_Playlist_6_7iVx_NjtPj0_owd12f.mp3" }
];

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState('00:00');
  
  const audioRef = useRef(null);

  // Actualizar la hora actual
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Actualizar cada minuto
    
    return () => clearInterval(interval);
  }, []);
  
  // Manejar metadata de audio cuando carga
  useEffect(() => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(formatTime(audioRef.current.duration));
    });
  }, []);

  // Formato de tiempo (segundos -> MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Controles de reproducción
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = async () => {
    setIsLoading(true);
    setIsPlaying(false);
    
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    
    try {
      audioRef.current.src = songs[nextIndex].url;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error al reproducir:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const playPrev = async () => {
    setIsLoading(true);
    setIsPlaying(false);
    
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    
    try {
      audioRef.current.src = songs[prevIndex].url;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error al reproducir:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Control de volumen
  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Actualización de la barra de progreso
  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setProgress((current / dur) * 100);
    setCurrentTime(formatTime(current));
  };

  // Cambiar posición de reproducción al hacer clic en la barra
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  return (
    <div className="player">
      <div className="player-display">
        <div className="time-display">{time}</div>
        <div className="status-display">
          {isLoading ? (
            <span className="loading">Cargando...</span>
          ) : (
            <span>{isPlaying ? 'Reproduciendo' : 'Detenido'}</span>
          )}
        </div>
        {isPlaying && <div className="audio-wave"></div>}
      </div>

      <div className="player-controls">
        <audio
          ref={audioRef}
          src={songs[currentSongIndex].url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />
        
        <div className="progress-bar" onClick={handleProgressClick}>
          <div 
            className="progress-filled" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        
        <div className="time-info">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
        
        <div className="control-buttons">
          <button className="control-btn" onClick={playPrev}>
            <FaStepBackward />
          </button>
          <button className="control-btn play" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-btn" onClick={playNext}>
            <FaStepForward />
          </button>
        </div>
        
        <div className="volume-control">
          <button className="volume-btn" onClick={toggleMute}>
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Player;