import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AverageCVSS: React.FC = () => {
  const data = {
    labels: [
      'CWE-01: NOMBRE',
      'CWE-02: NOMBRE',
      'CWE-03: NOMBRE',
      'CWE-04: NOMBRE',
      'CWE-05: NOMBRE',
    ],
    datasets: [
      {
        data: [6.1, 2.3, 8, 10, 4],
        backgroundColor: '#3498db',
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 6.1,
            yMax: 6.1,
            borderColor: '#2ecc71',
            borderWidth: 2,
            label: {
              content: 'Average CVSS: 6.1',
              enabled: true,
              position: 'end',
            },
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="chart-container" style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AverageCVSS;
