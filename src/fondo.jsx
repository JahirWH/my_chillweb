import React, { useState, useEffect, useRef } from 'react';
import './fondo.css';
const fondo1 = 'https://res.cloudinary.com/dr9van0op/image/upload/v1745538021/bg1_jzlxlw.webp';
const fondo2 = 'https://res.cloudinary.com/dr9van0op/image/upload/v1745538552/bg2_cuslvq.webp';
const fondo3 = 'https://res.cloudinary.com/dr9van0op/image/upload/v1745537533/bg8_y0idnl.webp';


document.body.style.backgroundImage = `url(${fondo1})`;

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
    
      <button className="fondo-btn" >
      <div className="lector">
        <input type="text" className="input" placeholder="Link youtube video..." />
        <button className="btn">Buscar</button>
      </div>
        <img className="next" onClick={cambiarFondo} src={fondo1} alt="Cambiar fondo" />
      </button>
     </>
  );
}

export default FondoCambiante;