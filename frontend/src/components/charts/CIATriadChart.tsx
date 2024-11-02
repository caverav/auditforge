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

type CIAData = {
  subject: string;
  current: number;
  target: number;
};

type Props = {
  data: CIAData[];
};

export const CIATriadChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.subject),
    datasets: [
      {
        label: 'Current',
        data: data.map(d => d.current),
        backgroundColor: 'rgba(255, 77, 77, 0.5)',
        borderColor: 'rgb(255, 77, 77)',
        borderWidth: 1,
      },
      {
        label: 'Target',
        data: data.map(d => d.target),
        backgroundColor: 'rgba(130, 202, 157, 0.5)',
        borderColor: 'rgb(130, 202, 157)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Radar data={chartData} options={options} />
    </div>
  );
};
