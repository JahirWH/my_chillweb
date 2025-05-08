import { useState, useRef, useEffect } from 'react';
import './App.css';


const preview2 = 'https://media.giphy.com/media/UByFQJYlKxprETlJ84/giphy.gif?cid=ecf05e475x7ql9pxrfxz957k9wsz6g3z4t15velkoaijh7vj&ep=v1_gifs_related&rid=giphy.gif&ct=g';
const preview1 = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzc1czJ3ZTV0YnlhMjRpYzI2NmxtYXNwdHBiMnA1b3p4MGxqN3VkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C3gZCY92Cwyxq/giphy.gif'
const song1 = 'https://res.cloudinary.com/dr9van0op/video/upload/v1745559331/Galaxy_s_Most_Wanted_0sfwvi46i7I_rw0pjm.mp3';
const song2 = 'https://res.cloudinary.com/dr9van0op/video/upload/v1745559326/Your_Signal_in_the_Stars_bQvfCzNpQ00_fqdnbr.mp3';
const song3 = 'https://res.cloudinary.com/dr9van0op/video/upload/v1745559338/90s_Japanese_Lo-Fi___%E3%82%86%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A8%E6%B5%81%E3%82%8C%E3%82%8B%E5%A4%9C%E3%81%AE%E9%9F%B3_Slowly_flowing_night_sounds_Lofi_Hiphop_Mix_Z0_f6I_jJXQ_wnvjok.mp3';

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward } from 'react-icons/fa';

function App() {
  const [currentPreview, setCurrentPreview] = useState(preview1); // Estado para la imagen actual
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Índice de la canción actual
  const [isLoading, setIsLoading] = useState(false);

  const cambio_preview = () => {
    // Alterna entre las dos imágenes
    setCurrentPreview((prevPreview) => (prevPreview === preview1 ? preview2 : preview1));
  };

  const audioRef = useRef(null);
  const songs = [song1, song2, song3]; 

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
    setCurrentTime(formatTime(current));
    if (dur) setDuration(formatTime(dur));
  };

  // const handleProgressClick = (e) => {
  //   const rect = e.target.getBoundingClientRect();
  //   const pos = (e.clientX - rect.left) / rect.width;
  //   audioRef.current.currentTime = pos * audioRef.current.duration;
  // };

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
      
      // Mostrar progreso de carga
      audioRef.current.onprogress = () => {
        if (audioRef.current.buffered.length > 0) {
          const bufferedEnd = audioRef.current.buffered.end(0);
          const duration = audioRef.current.duration || 1;
          const loadPercent = (bufferedEnd / duration) * 100;
          console.log(`Cargado: ${loadPercent.toFixed(1)}%`);
        }
      };
      
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

  useEffect(() => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(formatTime(audioRef.current.duration));
    });
  }, []);

  const [horaActual, setHoraActual] = useState('');

  useEffect(() => {
    // Función para actualizar la hora
    const actualizarHora = () => {
      const ahora = new Date();
      const horas = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      setHoraActual(`${horas}:${minutos}`);
    };
    // Actualizar inmediatamente al montar el componente
    actualizarHora();
    // Configurar intervalo para actualizar cada segundo
    const intervalo = setInterval(actualizarHora, 1000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);


 

  
    // Tu lógica y estados existentes...
  
    return (
        <section className='section-chill-app'>
          <div className="chill-app">

          <div className='img-preview' onClick={cambio_preview}>
          {/* <img src={currentPreview} className='preview' alt='miniatura' /> */}
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
                  src={songs[currentSongIndex]} // Usa la canción actual
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={playNext} // Reproduce la siguiente canción al terminar
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
          </div>
        </section>
    );
  }
  
  export default App;