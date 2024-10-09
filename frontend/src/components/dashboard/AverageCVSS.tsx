import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

const AverageCVSS: React.FC = () => {
  const averageCVSS = 6.1;

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

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
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
            xMin: averageCVSS,
            xMax: averageCVSS,
            borderColor: '#2ecc71',
            borderWidth: 2,
            borderDash: [5, 5],
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full text-right pr-4 text-green-400 text-sm">
          Average CVSS: {averageCVSS}
        </div>
        <div className="chart-container" style={{ height: '400px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AverageCVSS;
