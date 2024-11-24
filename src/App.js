import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Form from './pages/Form';
import PastEntries from './pages/PastEntries';
import Stats from './pages/Stats';

function App() {
  return (
    <Router basename="/Aprendizaje"> {/* This sets the correct basename */}
      <Routes>
        {/* Redirect root (/) to the welcome screen */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Define routes for your app */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/form" element={<Form />} />
        <Route path="/entries" element={<PastEntries />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
