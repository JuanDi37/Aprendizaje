import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    learned: '',
    grateful: '',
    improve: '',
    expectations: '',
    yesterdayGoals: '',
  });

  // Cargar datos previos desde Local Storage al montar el componente
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('dailyForm'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Guardar los datos en Local Storage y actualizar historial
  const handleSubmit = (e) => {
    e.preventDefault();

    // Añadir un timestamp a la entrada
    const entryWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(), // Agregar la fecha y hora actual
    };

    // Guardar entrada actual en el historial
    const history = JSON.parse(localStorage.getItem('dailyFormHistory')) || [];
    history.push(entryWithTimestamp);
    localStorage.setItem('dailyFormHistory', JSON.stringify(history));

    // Guardar la entrada actual
    localStorage.setItem('dailyForm', JSON.stringify(formData));
    alert('¡Tus reflexiones han sido guardadas!');
  };

  return (
    <div className="form-container">
      <h1>Formulario Diario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>¿Qué aprendiste hoy?</label>
          <textarea
            name="learned"
            value={formData.learned}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>¿De qué estás agradecido?</label>
          <textarea
            name="grateful"
            value={formData.grateful}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>¿Cómo mejorarás mañana?</label>
          <textarea
            name="improve"
            value={formData.improve}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>¿Qué expectativas tienes?</label>
          <textarea
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>¿Cumpliste tus metas de ayer?</label>
          <select
            name="yesterdayGoals"
            value={formData.yesterdayGoals}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type="submit" className="form-submit">
          Guardar Reflexión
        </button>
      </form>

      <button
        className="view-entries-button"
        onClick={() => navigate('/entries')}
      >
        Ver Entradas Pasadas
      </button>
    </div>
  );
}

export default Form;
