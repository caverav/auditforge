import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
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
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.score),
        backgroundColor: '#8884d8',
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
      <h3 className="text-lg font-semibold mb-4">Average CVSS</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};
