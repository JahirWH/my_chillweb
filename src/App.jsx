import { useState, useRef, useEffect } from 'react';
import './App.css';

// Importa tu imagen de preview y algún icono para los controles
import preview from './assets/preview.jpg';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [currentTime, setCurrentTime] = useState('0:00');
  // const [duration, setDuration] = useState('0:00');
  
  const audioRef = useRef(null);
  
  // Ejemplo de canción (reemplaza con tu archivo de audio)
  const audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

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

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setProgress((current / dur) * 100);
    
    // Formatear tiempo
    setCurrentTime(formatTime(current));
    if (dur) setDuration(formatTime(dur));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

 

  useEffect(() => {
    // Precargar metadatos para obtener la duración
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(formatTime(audioRef.current.duration));
    });
  }, []);

 
  return (
    <section className='section-chill-app'>
    <div className="chill-app">
    <div className='img-preview'>
          <img src={preview} className='preview' alt='miniatura' />


          {isPlaying && <div className='audio-wave'></div>}
        </div>
      <section className='media-player'>
        
        
        <div className='reproductor'>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
          
          <div className='controls'>
          <button className='prev-btn' onClick={() => { /* lógica para canción anterior */ }}>
          <FaStepBackward />
        </button>
            <button className='play-btn' onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button> 
            <button className='next-btn' onClick={() => { /* lógica para canción siguiente */ }}>
            <FaStepForward />
          </button>
  
           
          </div>
        </div>
        
      </section>

          <div className='volume-control' onmouseenter="showSlider()" onmouseleave="hideSlider()">
          <button  id="volume-icon"  onClick={toggleMute}>
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            className='volume-slider'
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
          
        </div>

    </div>
   </section>

  
    
    
      

  );
}


 



export default App;