import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { initializeAnalytics, trackPageView, trackEvent } from './analytics';

const TrackPage = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  return null;
};

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    initializeAnalytics();
    console.info('Componente cargado');
    console.info('Usando loglevel');

    // Simulando un error de red
    const fetchData = async () => {
      try {
        console.debug('Haciendo una solicitud ...');
        // Imagina que aquí hay una solicitud a una API
        throw new Error('Error de red');
      } catch (error) {
        console.error(`Error al obtener datos: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    console.debug('Botón clickeado');
    trackEvent('User', 'Clicked Increment Button');
    setCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        console.warn('Contador alcanzó 5');
      }
      return newCount;
    });
  };

  return (
    <Router>
      <TrackPage />
      <div>
        <h1>React y Logs</h1>
        <p>Contador: {count}</p>
        <button onClick={handleClick}>Incrementar</button>
      </div>
    </Router>
  );
};

export default App;
