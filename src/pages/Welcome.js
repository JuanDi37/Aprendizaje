import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">¡Bienvenido a Aprendizajes!</h1>
      <p className="welcome-message">
        Reflexiona sobre tus metas, aprendizajes y agradecimientos diarios. ¡Empieza hoy!
      </p>
      <button
        className="welcome-button"
        onClick={() => navigate('/form')}
      >
        Comenzar
      </button>
      <button
        className="stats-button"
        onClick={() => navigate('/stats')}
      >
        Ver Estadísticas
      </button>
    </div>
  );
}

export default Welcome;
