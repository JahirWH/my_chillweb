import React, { useEffect } from 'react';
import '../styles/City.css';

function City() {
  useEffect(() => {
    // Inicializar animaciones de la ciudad
    
    return () => {
      // Limpieza
    };
  }, []);

  return (
    <div className="city-background">
      {/* Elementos animados de la ciudad */}
      <div className="buildings"></div>
      <div className="cars"></div>
      <div className="lights"></div>
    </div>
  );
}

export default City;