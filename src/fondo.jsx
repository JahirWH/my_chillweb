import { useState } from 'react';
import './fondo.css'; // Asegúrate de tener estilos para los fondos
import fondo1 from './assets/bg.jpg';
import fondo2 from './assets/bg1.png';
import fondo3 from './assets/bg2.jpg';

function FondoCambiante() {
  const fondos = [fondo1, fondo2, fondo3]; // Arreglo de imágenes
  const [currentFondoIndex, setCurrentFondoIndex] = useState(0);

  const cambiarFondo = () => {
    const nextIndex = (currentFondoIndex + 1) % fondos.length; // Cambia al siguiente fondo
    setCurrentFondoIndex(nextIndex);

    // Cambia el fondo del body
    document.body.style.backgroundImage = `url(${fondos[nextIndex]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  };

  return (
    <>
      <button className="fondo-btn" onClick={cambiarFondo}>
        <img className="next" src={fondo1} alt="Cambiar fondo" />
      </button>
      
      <div className="lector">
        <input type="text" className="input" placeholder="Escribe la url..." />
        <p className="texto">Escribe tu url de youtube para buscarlo</p>
      </div>
    </>

  );
}

export default FondoCambiante;