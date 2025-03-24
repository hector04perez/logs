import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
    setCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 5) {
        console.warn('Contador alcanzó 5');
      }
      return newCount;
    });
  };

  return (
    <div>
      <h1>React y Logs</h1>
      <p>Contador: {count}</p>
      <button onClick={handleClick}>Incrementar</button>
    </div>
  );
};

export default App;
