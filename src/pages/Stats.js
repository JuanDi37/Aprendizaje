import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './Stats.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Stats() {
  const [stats, setStats] = useState({
    totalDays: 0,
    goalsCompleted: 0,
    goalsNotCompleted: 0,
  });

  const [entriesPerDay, setEntriesPerDay] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('dailyFormHistory')) || [];
    
    const totalDays = history.length;
    const goalsCompleted = history.filter((entry) => entry.yesterdayGoals === 'yes').length;
    const goalsNotCompleted = totalDays - goalsCompleted;

    const entriesByDay = history.map((_, index) => `Día ${index + 1}`);

    setStats({
      totalDays,
      goalsCompleted,
      goalsNotCompleted,
    });

    setEntriesPerDay(entriesByDay);
  }, []);

  const exportData = () => {
    const history = JSON.parse(localStorage.getItem('dailyFormHistory')) || [];
    const dataStr = JSON.stringify(history, null, 2); // Formatear datos con indentación
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reflexiones.json';
    link.click();

    // Liberar el objeto URL
    URL.revokeObjectURL(url);
  };

  const goalsData = {
    labels: ['Metas Cumplidas', 'Metas No Cumplidas'],
    datasets: [
      {
        label: 'Número de Metas',
        data: [stats.goalsCompleted, stats.goalsNotCompleted],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };

  const entriesData = {
    labels: entriesPerDay,
    datasets: [
      {
        label: 'Entradas por Día',
        data: Array(entriesPerDay.length).fill(1),
        backgroundColor: '#007bff',
      },
    ],
  };

  return (
    <div className="stats-container">
      <h1>Estadísticas</h1>
      {stats.totalDays === 0 ? (
        <p>No hay datos registrados aún.</p>
      ) : (
        <>
          <p><strong>Total de días registrados:</strong> {stats.totalDays}</p>
          <p><strong>Porcentaje de metas cumplidas:</strong> {((stats.goalsCompleted / stats.totalDays) * 100).toFixed(2)}%</p>
          
          <div className="chart-container">
            <h2>Metas Cumplidas vs No Cumplidas</h2>
            <Bar data={goalsData} />
          </div>

          <div className="chart-container">
            <h2>Cantidad de Entradas por Día</h2>
            <Bar data={entriesData} />
          </div>
          
          <button className="export-button" onClick={exportData}>
            Exportar Datos
          </button>
        </>
      )}
    </div>
  );
}

export default Stats;
