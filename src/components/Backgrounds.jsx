import React, { useState, useRef, useEffect } from 'react';
import Jungle from '../backgrounds/jungle';
import City from '../backgrounds/City';
import Chill from '../backgrounds/Chill';
import '../styles/Backgrounds.css';

// Iconos para los botones (reemplazar con tus propias imágenes)
import jungleIcon from '../assets/selva.jpeg';
import cityIcon from '../assets/city.jpeg'; 
import chillIcon from '../assets/space.png';
// import personal from '../assets/personal.png';

const backgrounds = [
  { key: 'chill', label: 'Darknes', icon: chillIcon },
  { key: 'jungle', label: 'Selva', icon: jungleIcon },
  { key: 'city', label: 'Ciudad', icon: cityIcon },
  { key: 'chill', label: 'Chill', icon: chillIcon },
];

function Backgrounds({ currentBackground, setCurrentBackground, animationsEnabled }) {
  const [open, setOpen] = useState(false);
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Backgrounds;