import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Form from './pages/Form';
import PastEntries from './pages/PastEntries';
import Stats from './pages/Stats';

function App() {
  return (
    <Router basename="/Aprendizaje">
      <Routes>
        {/* Redirect the root route (/) to the welcome screen */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Route for the welcome screen */}
        <Route path="/welcome" element={<Welcome />} />

        {/* Route for the daily form */}
        <Route path="/form" element={<Form />} />

        {/* Route for past entries */}
        <Route path="/entries" element={<PastEntries />} />

        {/* Route for statistics */}
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
