import React, { useState, useRef, useEffect } from 'react';
import Jungle from '../backgrounds/jungle';
import City from '../backgrounds/City';
import Chill from '../backgrounds/Chill';
import '../styles/Backgrounds.css';

// Iconos para los botones (reemplazar con tus propias imágenes)
import jungleIcon from '../assets/selva.jpeg';
import cityIcon from '../assets/city.jpeg'; 
import chillIcon from '../assets/space.png';
import fullico from '/fullico.png'
// import personal from '../assets/personal.png';

const backgrounds = [
  { key: 'chill', label: 'Darknes', icon: chillIcon },
  { key: 'jungle', label: 'Selva', icon: jungleIcon },
  { key: 'city', label: 'Ciudad', icon: cityIcon },
  { key: 'chill', label: 'Chill', icon: chillIcon },
];

function Backgrounds({ currentBackground, setCurrentBackground, onFullscreen }) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [trackError, setTrackError] = useState('');
  const [customTracks, setCustomTracks] = useState([]);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const selectorRef = useRef(null);

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Renderizar el fondo activo según la selección
  const renderActiveBackground = () => {
    switch(currentBackground) {
      case 'jungle':
        return <Jungle animationsEnabled={animationsEnabled} />;
      case 'city':
        return <City animationsEnabled={animationsEnabled} />;
      case 'chill':
      default:
        return <Chill animationsEnabled={animationsEnabled} />;
    }
  };

  // Solo mostrar el fondo activo si el menú está cerrado
  const activeBg = backgrounds.find(bg => bg.key === currentBackground) || backgrounds[0];

  // Funciones para manejar la adición y eliminación de tracks personalizados
  const handleAddTrack = () => {
    if (newTrackUrl.trim() === '') return;
    if (customTracks.includes(newTrackUrl)) {
      setTrackError('Este track ya ha sido agregado.');
      return;
    }
    setCustomTracks([...customTracks, newTrackUrl]);
    setNewTrackUrl('');
    setTrackError('');
  };

  const handleRemoveTrack = (trackToRemove) => {
    setCustomTracks(customTracks.filter(track => track !== trackToRemove));
  };

  // Función para verificar si una URL es de YouTube
  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  return (
    <div className="background-container">
      {/* Fondo activo */}
      <div className="active-background">
        {renderActiveBackground()}
      </div>
      
      {/* Panel de selección de fondos */}
      <div 
        className={`background-selector${open ? ' open' : ''}`}
        ref={selectorRef}
      >
        {/* Botón principal (fondo activo) */}
        <button 
          className={`bg-btn active`}
          onClick={() => setOpen(!open)}
        >
          <img src={activeBg.icon} alt={activeBg.label} />
          <span>{activeBg.label}</span>
        </button>
        
        {/* Menú desplegable */}

        {open && (
          <div className="bg-dropdown">
            {/* Botones de fondos */}
            {backgrounds.filter(bg => bg.key !== currentBackground).map(bg => (
              <button 
                key={bg.key + bg.label}
                className={`bg-btn`}
                onClick={() => {
                  setCurrentBackground(bg.key);
                  setOpen(false);
                }}
              >
                <img src={bg.icon} alt={bg.label} />
                <span>{bg.label}</span>
              </button>
            ))}
            
            {/* Settings ahora dentro del dropdown */}
            <div className='settings'>
              <button onClick={() => setShowSettings(!showSettings)}>Settings</button>
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

        )}
      </div>

      <button className='fullscreen-btn' onClick={onFullscreen}>
        <img src={fullico} alt="Fullscreen" />
      </button>
    </div>
);
}

export default Backgrounds;
