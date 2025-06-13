import React, { useEffect, useRef } from 'react';
import '../styles/Chill.css';

function Chill() {
  const snowContainerRef = useRef(null);

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      // Tamaño aleatorio entre 2px y 5px
      const size = Math.random() * 3 + 2;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      
      // Posición horizontal aleatoria
      snowflake.style.left = `${Math.random() * 100}%`;
      
      // Duración de la animación aleatoria entre 5s y 10s
      const duration = Math.random() * 5 + 5;
      snowflake.style.animationDuration = `${duration}s`;
      
      // Retraso inicial aleatorio
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      
      return snowflake;
    };

    const addSnowflakes = () => {
      const container = snowContainerRef.current;
      if (!container) return;

      // Crear 50 copos de nieve
      for (let i = 0; i < 50; i++) {
        const snowflake = createSnowflake();
        container.appendChild(snowflake);
      }
    };

    addSnowflakes();

    // Limpiar copos de nieve cuando el componente se desmonte
    return () => {
      if (snowContainerRef.current) {
        snowContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="chill-background">
      <div className="snow" ref={snowContainerRef}></div>
      <div className="gradient"></div>
      <div className="waves"></div>
    </div>
  );
}

export default Chill;