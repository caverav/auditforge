import {
  BarElement,
  BubbleDataPoint,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Point,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  ChartDataLabels,
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
      datalabels: {
        formatter: (
          _: unknown,
          context: {
            chart: ChartJS;
            dataIndex: number;
            dataset: {
              data: (
                | number
                | [number, number]
                | Point
                | BubbleDataPoint
                | null
              )[];
            };
          },
        ) => {
          const current = parseFloat(
            (context.dataset.data[context.dataIndex] ?? '0').toString(),
          );
          let total = 0;
          data.forEach(d => {
            total += d.remediation;
            total += d.execution;
          });
          return ((current / total) * 100).toFixed(2) + '%';
        },
        color: '#fff' as const,
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
