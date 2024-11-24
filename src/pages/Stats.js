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
    totalEntries: 0,
    goalsCompleted: 0,
    goalsNotCompleted: 0,
  });

  const [entriesPerDay, setEntriesPerDay] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('dailyFormHistory')) || [];

    // Agrupar entradas por fecha y calcular metas cumplidas/no cumplidas
    const entriesByDate = history.reduce((acc, entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString(); // Usar timestamp para identificar fechas únicas
      if (!acc[date]) {
        acc[date] = {
          count: 0,
          goalsCompleted: 0,
          goalsNotCompleted: 0,
        };
      }
      acc[date].count += 1;
      if (entry.yesterdayGoals === 'yes') acc[date].goalsCompleted += 1;
      if (entry.yesterdayGoals === 'no') acc[date].goalsNotCompleted += 1;
      return acc;
    }, {});

    const totalDays = Object.keys(entriesByDate).length;
    const totalEntries = history.length;

    // Calcular metas cumplidas/no cumplidas totales
    const goalsCompleted = Object.values(entriesByDate).reduce(
      (sum, day) => sum + day.goalsCompleted,
      0
    );
    const goalsNotCompleted = Object.values(entriesByDate).reduce(
      (sum, day) => sum + day.goalsNotCompleted,
      0
    );

    const entriesByDayLabels = Object.keys(entriesByDate);
    const entriesByDayData = Object.values(entriesByDate).map(day => day.count);

    setStats({
      totalDays,
      totalEntries,
      goalsCompleted,
      goalsNotCompleted,
    });

    setEntriesPerDay({
      labels: entriesByDayLabels,
      data: entriesByDayData,
    });
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
    labels: entriesPerDay.labels,
    datasets: [
      {
        label: 'Entradas por Día',
        data: entriesPerDay.data,
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
          <p><strong>Total de entradas registradas:</strong> {stats.totalEntries}</p>
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
