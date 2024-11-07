import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { t } from 'i18next';
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

type AuditTime = {
  name: string;
  execution: number;
  remediation: number;
};

type Props = {
  data: AuditTime[];
};

export const TimePerAuditChart: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">{t('err.noMatchingRecords')}</p>
    );
  }
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: 'Time of execution',
        data: data.map(d => d.execution),
        backgroundColor: '#82ca9d',
      },
      {
        label: 'Time of reporting',
        data: data.map(d => d.remediation),
        backgroundColor: '#8884d8',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        title: {
          display: true,
          text: t('filters'),
          color: 'white',
          font: {
            weight: 'bold',
            size: 15,
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};
