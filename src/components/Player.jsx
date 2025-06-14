import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';
import '../styles/Player.css';
import music from '../assets/musica.json';

// Lista de canciones desde el archivo JSON
const songs = music.map(song => ({
  title: song.title,
  artist: song.artist,
  url: song.url
}));

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
  
  const audioRef = useRef(new Audio());

  // Precargar la primera canción
  useEffect(() => {
    const audio = audioRef.current;
    
    const loadAudio = async () => {
      try {
        console.log('Loading audio:', songs[0].url);
        audio.src = songs[0].url;
        audio.volume = volume;
        
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = (e) => {
            console.error('Error loading audio:', e);
            reject(e);
          };
          audio.load();
        });
        
        console.log('Audio loaded successfully');
      } catch (error) {
        console.error('Failed to load audio:', error);
      }
    };

    loadAudio();
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Actualizar el volumen cuando cambia
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded:', {
        duration: audio.duration,
        src: audio.src
      });
      setDuration(formatTime(audio.duration));
    };

    const handleError = (e) => {
      console.error('Error loading audio:', e);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Formato de tiempo (segundos -> MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Controles de reproducción
  const togglePlay = async () => {
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        setIsLoading(true);
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling play:', error);
      setIsLoading(false);
    }
  };

  const playNext = async () => {
    setIsLoading(true);
    setIsPlaying(false);
    
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    
    try {
      const audio = audioRef.current;
      audio.src = songs[nextIndex].url;
      console.log('Loading next song:', songs[nextIndex].title);
      
      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.load();
      });
      
      await audio.play();
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
      const audio = audioRef.current;
      audio.src = songs[prevIndex].url;
      console.log('Loading previous song:', songs[prevIndex].title);
      
      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.load();
      });
      
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error al reproducir:", error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="player">
      <div className="player-display">
        <div className="time-display">{time}</div>
        <div className="song-info">
          <div className="song-title">{songs[currentSongIndex].title}</div>
          <div className="song-artist">{songs[currentSongIndex].artist}</div>
        </div>
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