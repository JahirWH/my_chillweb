// filepath: /home/ahir/Documentos/GitHub/my_chillweb/src/fondo.jsx
import React, { useState } from 'react';
import './fondo.css';
import spaceimg from './assets/space.png';
import old from './assets/old.jpeg';
import selvaimg from './assets/selva.jpeg';
import cityimg from './assets/city.jpeg';
import anime from './assets/anime.jpeg';

function barra(){
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  
}


const fondo1 = 'https://res.cloudinary.com/dr9van0op/image/upload/v1745538021/bg1_jzlxlw.webp';
const fondo2 = 'https://res.cloudinary.com/dr9van0op/image/upload/v1745538552/bg2_cuslvq.webp';
const fondo3 = 'https://res.cloudinary.com/dr9van0op/image/upload/v1745537533/bg8_y0idnl.webp';

document.body.style.backgroundImage = `url(${fondo1})`;

function FondoCambiante() {
  const fondos = [fondo1, fondo2, fondo3];
  const [currentFondoIndex, setCurrentFondoIndex] = useState(0);

  const cambiarFondo = () => {
    const nextIndex = (currentFondoIndex + 1) % fondos.length;
    setCurrentFondoIndex(nextIndex);

    document.body.style.backgroundImage = `url(${fondos[nextIndex]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }

const cambiarFondoPersonalizado = (img) => {
  document.body.style.backgroundImage = `url(${img})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundAttachment = 'fixed';
};



  return (
    <>
      <button className="fondo-btn">
        <div className="modos">
<<<<<<< HEAD
       <ul>
  <li>
    <img onClick={() => cambiarFondoPersonalizado(spaceimg)} className="modos_img" src={spaceimg} />
    <p className="modos_img_text">Space</p>
  </li>
  <li>
    <img onClick={() => cambiarFondoPersonalizado(selvaimg)} className="modos_img" src={selvaimg} />
    <p className="modos_img_text">Selva</p>
  </li>
  <li>
    <img onClick={() => cambiarFondoPersonalizado(cityimg)} className="modos_img" src={cityimg} />
    <p className="modos_img_text">City</p>
  </li>
  <li>
    <img onClick={() => cambiarFondoPersonalizado(anime)} className="modos_img" src={anime} />
    <p className="modos_img_text">anime</p>
  </li>
</ul>
   </div>

        <img
          className="next"
          onClick={cambiarFondo}
          src={fondos[(currentFondoIndex + 1) % fondos.length]}
          alt="Cambiar fondo"
        />
      </button>
    </>
  );
}

export default FondoCambiante;