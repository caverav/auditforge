import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { t } from 'i18next';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  annotationPlugin,
);

type CVSSData = {
  name: string;
  score: number;
};

type Props = {
  data: CVSSData[];
};

export const CVSSChart: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">{t('err.noMatchingRecords')}</p>
    );
  }

  const averageCVSS = data.reduce((acc, d) => acc + d.score, 0) / data.length;

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.score),
        backgroundColor: data.map(d => {
          if (d.score >= 9.0) {
            return '#dc3545';
          } else if (d.score >= 7.0) {
            return '#fd7e14';
          } else if (d.score >= 4.0) {
            return '#ffc107';
          } else if (d.score >= 0.1) {
            return '#28a745';
          } else {
            return '#6c757d';
          }
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
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
    scales: {
      x: {
        min: 0,
        max: 10,
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full text-right pr-4 text-green-400 text-sm">
        Average CVSS: {averageCVSS}
      </div>
      <div className="h-[300px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
