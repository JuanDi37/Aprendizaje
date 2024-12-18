import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">¡Bienvenido a tu plataforma de Aprendizajes!</h1>
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
      <button
        className="past-entries-button"
        onClick={() => navigate('/entries')}
      >
        Ver Entradas Pasadas
      </button>
    </div>
  );
}

export default Welcome;
