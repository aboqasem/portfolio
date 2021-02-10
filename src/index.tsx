import React from 'react';
import ReactDOM from 'react-dom';
import Particles from 'particlesjs';
import App from './App';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

window.onload = () => {
  Particles.init({
    selector: '.background',
    maxParticles: 300,
    sizeVariations: 5,
    color: ['#2c7744', '#5a3f37'],
    responsive: [
      {
        breakpoint: 840,
        options: {
          maxParticles: 200,
          sizeVariations: 4,
        },
      },
      {
        breakpoint: 600,
        options: {
          maxParticles: 150,
          sizeVariations: 4,
        },
      },
      {
        breakpoint: 480,
        options: {
          maxParticles: 80,
          sizeVariations: 3,
        },
      },
    ],
  });
};
