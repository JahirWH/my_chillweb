import React, { useEffect } from 'react';
import '../styles/Chill.css';

function Chill() {
  useEffect(() => {
    // Inicializar animaciones del fondo chill
    
    return () => {
      // Limpieza
    };
  }, []);

  return (
    <div className="chill-background">
      {/* Elementos animados para ambiente chill */}
      <div className="gradient"></div>
      <div className="particles"></div>
      <div className="waves"></div>
    </div>
  );
}

export default Chill;