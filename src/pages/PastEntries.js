import React, { useState, useEffect } from 'react';
import './PastEntries.css';

function PastEntries() {
  const [entries, setEntries] = useState([]);

  // Cargar entradas desde Local Storage al montar el componente
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('dailyFormHistory')) || [];
    setEntries(savedEntries);
  }, []);

  // Función para exportar entradas
  const exportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2); // Formatear datos con indentación
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'entradas_pasadas.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  // Función para importar entradas
  const importEntries = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          const updatedEntries = [...entries, ...importedData];
          setEntries(updatedEntries);
          localStorage.setItem('dailyFormHistory', JSON.stringify(updatedEntries));
          alert('Entradas importadas con éxito.');
        } else {
          alert('El archivo no contiene un formato válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Función para eliminar una entrada
  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem('dailyFormHistory', JSON.stringify(updatedEntries));
  };

  return (
    <div className="entries-container">
      <h1>Entradas Pasadas</h1>
      <div className="entries-actions">
        <button className="export-button" onClick={exportEntries}>
          Exportar Entradas
        </button>
        <label htmlFor="import-file" className="import-button">
          Importar Entradas
          <input
            type="file"
            id="import-file"
            accept=".json"
            onChange={importEntries}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      {entries.length === 0 ? (
        <p>No tienes entradas registradas aún.</p>
      ) : (
        <ul className="entries-list">
          {entries.map((entry, index) => (
            <li key={index} className="entry-item">
              <p><strong>Aprendiste:</strong> {entry.learned}</p>
              <p><strong>Agradecido:</strong> {entry.grateful}</p>
              <p><strong>Mejorarás:</strong> {entry.improve}</p>
              <p><strong>Expectativas:</strong> {entry.expectations}</p>
              <p><strong>Metas de ayer:</strong> {entry.yesterdayGoals === 'yes' ? 'Sí' : 'No'}</p>
              <button onClick={() => handleDelete(index)} className="delete-button">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PastEntries;
