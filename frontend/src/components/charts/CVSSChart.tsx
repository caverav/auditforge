import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
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
      <Bar data={chartData} options={options} />
    </div>
  );
};
