import React, { useEffect } from 'react';
import '../styles/jungle.css';

function Jungle() {
  useEffect(() => {
    // Aquí puedes inicializar animaciones específicas de la selva
    // cuando el componente se monte
    
    return () => {
      // Limpieza cuando el componente se desmonte
    };
  }, []);

  return (
    <div className="jungle-background">
      {/* Aquí puedes agregar elementos animados de la selva */}
      <div className="leaves"></div>
      <div className="trees"></div>
      <div className="animals"></div>
    </div>
  );
}

export default Jungle;