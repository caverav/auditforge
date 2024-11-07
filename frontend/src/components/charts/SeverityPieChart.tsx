import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { t } from 'i18next';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">{t('err.noMatchingRecords')}</p>
    );
  }
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: data.map(d => d.color),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        title: {
          display: true,
          text: t('filters'),
          color: 'white' as const,
          padding: {
            top: 20,
          },
          font: {
            weight: 'bold' as const,
            size: 15,
          },
        },
      },
      datalabels: {
        formatter: (value: number) => {
          let total = 0;
          data.forEach(d => {
            total += d.value;
          });
          const percentage = ((value / total) * 100).toFixed(2);
          if (percentage === '0.00' || percentage === 'NaN') {
            return '';
          }
          return percentage + '%';
        },
        color: '#eee' as const,
      },
    },
  };

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">
        {total} {t('foundInTotal')}
      </p>
      <div className="h-auto w-fit mx-auto">
        <Doughnut data={chartData} options={options} />
      </div>
    </>
  );
};
