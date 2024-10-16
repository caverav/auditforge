import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getAuditById } from '@/services/audits';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const cvssStringTo = (
  field: 'integrity' | 'availability' | 'confidentiality',
  cvssVector: string,
) => {
  const values: Record<string, number> = {
    H: 3,
    M: 2,
    L: 1,
  } as const;
  const substrings = {
    integrity: 35,
    availability: 39,
    confidentiality: 43,
  } as const;
  return values[cvssVector.substring(substrings[field], substrings[field] + 1)];
};

type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

type CIATriadProps = {
  auditId?: string;
};

const CIATriad: React.FC<CIATriadProps> = ({ auditId }) => {
  const paramId = useParams().auditId;
  if (!auditId) {
    auditId = paramId;
  }
  const [data, setData] = useState<{
    labels: string[];
    datasets: Dataset[];
  }>({
    labels: ['Integrity', 'Availability', 'Confidentiality'],
    datasets: [],
  });

  useEffect(() => {
    getAuditById(auditId)
      .then(audit => {
        setData({
          labels: ['Integrity', 'Availability', 'Confidentiality'],
          datasets: audit.datas.findings.map(finding => {
            if (!finding.cvssv3) {
              return {
                label: finding.title,
                data: [0, 0, 0],
                backgroundColor: `rgba(${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, 0.2)`,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 2,
              };
            }
            return {
              label: finding.title,
              data: [
                cvssStringTo('integrity', finding.cvssv3),
                cvssStringTo('availability', finding.cvssv3),
                cvssStringTo('confidentiality', finding.cvssv3),
              ],
              backgroundColor: `rgba(${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, 0.2)`,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2,
            };
          }),
        });
      })
      .catch(console.error);
  }, [auditId]);

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
    <div className="bg-gray-800 rounded-lg p-6">
      <div
        className="chart-container"
        style={{ height: '400px', width: '100%' }}
      >
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default CIATriad;
