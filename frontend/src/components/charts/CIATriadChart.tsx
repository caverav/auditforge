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
        position: 'bottom' as const,
        labels: {
          color: 'white',
          boxWidth: 20,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Radar data={chartData} options={options} />
    </div>
  );
};
