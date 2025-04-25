import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Info from './Info.jsx';
import FondoCambiante from './fondo.jsx';


createRoot(document.getElementById('fondo')).render(
  <StrictMode>
    <FondoCambiante />

  </StrictMode>
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App />
  </StrictMode>
);

// createRoot(document.getElementById('Info')).render(
//   <StrictMode>
//    <Info />
//   </StrictMode>
// );


