import React from 'react';
import Jungle from '../backgrounds/jungle';
import City from '../backgrounds/City';
import Chill from '../backgrounds/Chill';
import '../styles/Backgrounds.css';

// Iconos para los botones (reemplazar con tus propias imágenes)
import jungleIcon from '../assets/selva.jpeg';
import cityIcon from '../assets/city.jpeg';
import chillIcon from '../assets/space.png';
// import personal from '../assets/personal.png';

function Backgrounds({ currentBackground, setCurrentBackground }) {
  // Renderizar el fondo activo según la selección
  const renderActiveBackground = () => {
    switch(currentBackground) {
      case 'jungle':
        return <Jungle />;
      case 'city':
        return <City />;
      case 'chill':
      default:
        return <Chill />;
    }
  };

  return (
    <div className="background-container">
      {/* Fondo activo */}
      <div className="active-background">
        {renderActiveBackground()}
      </div>
      
      {/* Panel de selección de fondos */}
      <div className="background-selector">
        <button 
          className={`bg-btn ${currentBackground === 'chill' ? 'active' : ''}`}
          onClick={() => setCurrentBackground('chill')}
        >
          <img src={chillIcon} alt="Darknes" />
          <span>Darknes</span>
        </button>

        <button 
          className={`bg-btn ${currentBackground === 'jungle' ? 'active' : ''}`}
          onClick={() => setCurrentBackground('jungle')}
        >
          <img src={jungleIcon} alt="Jungle" />
          <span>Selva</span>
        </button>
        
        <button 
          className={`bg-btn ${currentBackground === 'city' ? 'active' : ''}`}
          onClick={() => setCurrentBackground('city')}
        >
          <img src={cityIcon} alt="City" />
          <span>Ciudad</span>
        </button>
        
        <button 
          className={`bg-btn ${currentBackground === 'chill' ? 'active' : ''}`}
          onClick={() => setCurrentBackground('chill')}
        >
          <img src={chillIcon} alt="Chill" />
          <span>Chill</span>
        </button>
      </div>
    </div>
  );
}

export default Backgrounds;