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

type AuditTime = {
  name: string;
  execution: number;
  remediation: number;
};

type Props = {
  data: AuditTime[];
};

export const TimePerAuditChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: 'Time of execution',
        data: data.map(d => d.execution),
        backgroundColor: '#82ca9d',
      },
      {
        label: 'Time of remediation',
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
