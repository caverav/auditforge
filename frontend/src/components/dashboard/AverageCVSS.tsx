import { Cvss3P1 } from 'ae-cvss-calculator';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getAuditById } from '@/services/audits';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

const cvssStringToScore = (cvssScore: string) => {
  try {
    const cvssVector = new Cvss3P1(cvssScore);
    return cvssVector.calculateExactOverallScore();
  } catch (error) {
    console.error('Invalid CVSS vector:', error);
  }
  return 0;
};

type AverageCVSSProps = {
  auditId?: string;
};

const AverageCVSS: React.FC<AverageCVSSProps> = ({ auditId }) => {
  const paramId = useParams().auditId;
  if (!auditId) {
    auditId = paramId;
  }
  const [averageCVSS, setAverageCVSS] = useState(0);
  const [data, setData] = useState({
    labels: [''],
    datasets: [
      {
        data: [0],
        backgroundColor: '#3498db',
      },
    ],
  });
  useEffect(() => {
    if (auditId === undefined) {
      auditId = paramId;
    }
    getAuditById(auditId)
      .then(audit => {
        setAverageCVSS(
          Math.round(
            (audit.datas.findings.reduce(
              (acc, finding) => acc + cvssStringToScore(finding.cvssv3),
              0,
            ) /
              audit.datas.findings.length) *
              10,
          ) / 10,
        );
        setData({
          labels: audit.datas.findings.map(finding => finding.title),
          datasets: [
            {
              data: audit.datas.findings.map(finding =>
                cvssStringToScore(finding.cvssv3),
              ),
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              backgroundColor: audit.datas.findings.map(finding =>
                cvssStringToScore(finding.cvssv3) >= 9
                  ? '#FF4136'
                  : cvssStringToScore(finding.cvssv3) >= 7
                    ? '#FF851B'
                    : cvssStringToScore(finding.cvssv3) >= 4
                      ? '#FFDC00'
                      : '#2ECC40',
              ) as unknown as string,
            },
          ],
        });
      })
      .catch(console.error);
  }, [auditId, averageCVSS]);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: averageCVSS,
            xMax: averageCVSS,
            borderColor: '#2ecc71',
            borderWidth: 2,
            borderDash: [5, 5],
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full text-right pr-4 text-green-400 text-sm">
          Average CVSS: {averageCVSS}
        </div>
        <div className="chart-container" style={{ height: '400px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AverageCVSS;
