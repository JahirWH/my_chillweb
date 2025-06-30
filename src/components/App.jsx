import { useState, useRef, useEffect } from 'react';
import '../styles/App.css';
import music from '../assets/musica.json';
import Backgrounds from './Backgrounds';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';

const preview2 = 'https://media.giphy.com/media/UByFQJYlKxprETlJ84/giphy.gif?cid=ecf05e475x7ql9pxrfxz957k9wsz6g3z4t15velkoaijh7vj&ep=v1_gifs_related&rid=giphy.gif&ct=g';
const preview1 = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzc1czJ3ZTV0YnlhMjRpYzI2NmxtYXNwdHBiMnA1b3p4MGxqN3VkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C3gZCY92Cwyxq/giphy.gif'

// animaciones
function show_divs(id){
  

}


function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('chill');
  const [horaActual, setHoraActual] = useState('');
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const audioRef = useRef(null);
  const songs = music.map((song) => song.url);

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
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setProgress((current / dur) * 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

  return (
    <section className='section-chill-app'>
      <Backgrounds 
        currentBackground={currentBackground}
        setCurrentBackground={setCurrentBackground}
      />
      
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
        <div className='settings'>
          <button onClick={() => setShowSettings(!showSettings)} >settings</button>
          <div className='settings_show' style={{ display: showSettings ? 'block' : 'none' }}>
            <input type="text" placeholder='add your url track(no youtube)' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;