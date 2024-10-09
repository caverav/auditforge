import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const CIATriad: React.FC = () => {
  const data = {
    labels: ['Integrity', 'Availability', 'Confidentiality'],
    datasets: [
      {
        label: 'Vulnerability 1',
        data: [3, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Vulnerability 2',
        data: [2, 3, 1],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
      },
      {
        label: 'Vulnerability 3',
        data: [1, 1, 2],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 3,
        ticks: {
          stepSize: 1,
          display: false,
        },
        pointLabels: {
          font: {
            size: 14,
          },
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'white',
          boxWidth: 20,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div
        className="chart-container"
        style={{ height: '400px', width: '100%' }}
      >
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default CIATriad;
