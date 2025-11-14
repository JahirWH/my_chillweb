import { useState, useRef, useEffect } from 'react';
import '../styles/App.css';
import music from '../assets/musica.json';
import Backgrounds from './Backgrounds';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';

// animaciones (placeholders removed - not used)


function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('chill');
  const [horaActual, setHoraActual] = useState('');
  
  const [showSettings, setShowSettings] = useState(false);
  const [customTracks, setCustomTracks] = useState([]); // tracks agregados por el usuario
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const audioRef = useRef(null);
  const baseSongs = music.map((song) => song.url);
  const songs = [...baseSongs, ...customTracks];

  // Actualizar la hora
  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const horas = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      setHoraActual(`${horas}:${minutos}`);
    };
    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

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

  // const configuration = () => (
  //   setting.current.show = 
  // )


  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleTimeUpdate = () => {
    // placeholder: kept for audio onTimeUpdate event. Player component manages visual progress.
  };

  // Detectar si una URL es de YouTube
  const isYouTubeUrl = (url) => {
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/i.test(url);
  };

  // (formatTime removed from here because Player component defines and uses its own formatter)

  const playNext = async () => {
    setIsLoading(true);
    setIsPlaying(false);
    
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    
    try {
      audioRef.current.src = songs[nextIndex];
      await new Promise((resolve, reject) => {
        audioRef.current.oncanplaythrough = resolve;
        audioRef.current.onerror = reject;
        audioRef.current.load();
      });
      
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error:", error);
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
      audioRef.current.src = songs[prevIndex];
      await new Promise((resolve) => {
        audioRef.current.oncanplaythrough = resolve;
        audioRef.current.load();
      });
      
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error al cargar la canción:", error);
    } finally {
      setIsLoading(false);
    }
  };


const activarPantallaCompleta = () => {
  const elem = document.documentElement;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  else if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
};

  // Agregar track online
  const [trackError, setTrackError] = useState('');

  const isValidUrl = (url) => {
    // Basic validation for http(s) URLs and YouTube links
    return /^(https?:\/\/[^\s]+)$/.test(url) || isYouTubeUrl(url);
  };

  const handleAddTrack = () => {
    const trimmedUrl = newTrackUrl.trim();
    if (!trimmedUrl) {
      setTrackError('URL cannot be empty.');
      return;
    }
    if (!isValidUrl(trimmedUrl)) {
      setTrackError('Please enter a valid URL (http(s) or YouTube).');
      return;
    }
    if (songs.includes(trimmedUrl)) {
      setTrackError('This track is already added.');
      return;
    }
    setCustomTracks([...customTracks, trimmedUrl]);
    setNewTrackUrl('');
    setTrackError('');
  };

  // Eliminar track agregado
  const handleRemoveTrack = (url) => {
    setCustomTracks(customTracks.filter(track => track !== url));
  };

  return (
    <section className='section-chill-app'>
      <Backgrounds 
        currentBackground={currentBackground}
        setCurrentBackground={setCurrentBackground}
        animationsEnabled={animationsEnabled}
        onFullscreen={activarPantallaCompleta}
      />
      
       <div className='volume-control'>
          <button id="volume-icon" onClick={toggleMute}>
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
      
      
      <div className="chill-app">
        <div className='img-preview'>
          <p className='time'>{horaActual}</p>
          <p className='estado'>
            {isLoading ? (
              <span className='loading'>Cargando...</span>
            ) : (
              isPlaying ? 'Playing' : 'Stopped'
            )}
          </p>
          {isPlaying && <div className='audio-wave'></div>}
        </div>

        <section className='media-player'>
          <div className='reproductor'>
            <audio
              ref={audioRef}
              src={songs[currentSongIndex]}
              onTimeUpdate={handleTimeUpdate}
              onEnded={playNext}
            />
            <div className='controls'>
              <button className='prev-btn' onClick={playPrev}>
                <FaStepBackward />
              </button>
              <button className='play-btn' onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button className='next-btn' onClick={playNext}>
                <FaStepForward />
              </button>
            </div>
          </div>
        </section>
       

      

       
        
      
       

       

        <div className='settings'>
          <button onClick={() => setShowSettings(!showSettings)} >Settings</button>
          <div className={`settings_show ${showSettings ? 'settings_show_active' : ''}`}>
            <div style={{marginBottom: '10px'}}>
              <input 
                type="text" 
                placeholder='Add your YouTube or direct audio URL'
                value={newTrackUrl}
                onChange={e => setNewTrackUrl(e.target.value)}
                style={{width: '70%'}}
              />
              <button onClick={handleAddTrack}>Add</button>
              {trackError && (
                <div style={{ color: 'red', marginTop: '5px', fontSize: '0.95em' }}>
                  {trackError}
                </div>
              )}
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  checked={animationsEnabled}
                  onChange={() => setAnimationsEnabled(!animationsEnabled)}
                />
                Animaciones activas
              </label>
            </div>
            {customTracks.length > 0 && (
              <div style={{marginTop: '10px'}}>
                <strong>Tracks agregados:</strong>
                <ul>
                  {customTracks.map((track, idx) => (
                    <li key={idx}>
                      {track}
                      {isYouTubeUrl(track) ? (
                        <>
                          <button style={{marginLeft: '10px'}} onClick={() => window.open(track, '_blank', 'noopener')}>Abrir</button>
                          <small style={{marginLeft: '8px', color: 'rgba(255,255,255,0.7)'}}>YouTube</small>
                        </>
                      ) : (
                        <button style={{marginLeft: '10px'}} onClick={() => handleRemoveTrack(track)}>Quitar</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>


      </div>
    </section>
  );
}

export default App;