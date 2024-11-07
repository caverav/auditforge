import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { t } from 'i18next';
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
  current: 0 | 1 | 2;
  target: 0 | 1 | 2;
};

type Props = {
  data: CIAData[];
};

export const CIATriadChart: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">{t('err.noMatchingRecords')}</p>
    );
  }
  const chartData = {
    labels: data.map(d => d.subject),
    datasets: [
      {
        label: 'Average',
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
        suggestedMax: 2,
        ticks: {
          stepSize: 1,
          callback: (value: number | string) => {
            if (value === 0) {
              return 'None';
            }
            if (value === 1) {
              return 'Low';
            }
            if (value === 2) {
              return 'High';
            }
            return value;
          },
          display: true,
          color: 'black' as const,
        },
        pointLabels: {
          font: {
            size: 14,
          },
          color: 'white' as const,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' as const,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        title: {
          display: true,
          text: t('filters'),
          color: 'white' as const,
          font: {
            weight: 'bold' as const,
            size: 15,
          },
        },
        labels: {
          color: 'white' as const,
          boxWidth: 20,
          padding: 20,
        },
      },
      datalabels: {
        formatter: () => '',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)' as const,
        titleColor: 'white' as const,
        bodyColor: 'white' as const,
        borderColor: 'white' as const,
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
