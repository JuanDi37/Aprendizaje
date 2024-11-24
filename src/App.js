import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Form from './pages/Form';
import PastEntries from './pages/PastEntries';
import Stats from './pages/Stats';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la ruta raíz (/) a la pantalla de bienvenida */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        
        {/* Ruta para la pantalla de bienvenida */}
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Ruta para el formulario diario */}
        <Route path="/form" element={<Form />} />
        
        {/* Ruta para las entradas pasadas */}
        <Route path="/entries" element={<PastEntries />} />
        
        {/* Ruta para las estadísticas */}
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
