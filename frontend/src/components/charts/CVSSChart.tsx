import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { t } from 'i18next';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

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
    <div className="h-[300px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};
