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
      },
      datalabels: {
        formatter: (value: number) => {
          // count total number of findings
          let total = 0;
          data.forEach(d => {
            total += d.value;
          });
          if (value / total === 0) {
            return '';
          }
          return ((value / total) * 100).toFixed(2) + '%';
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
