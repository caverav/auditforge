import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type SeverityData = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: SeverityData[];
  total: number;
};

export const SeverityPieChart: React.FC<Props> = ({ data, total }) => {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: data.map(d => d.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <p className="text-sm text-gray-500 mb-4">{total} found in total</p>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
