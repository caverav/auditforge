import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getAuditById } from '../../services/audits';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type RemediationComplexityProps = {
  auditId?: string;
};

const RemediationComplexity: React.FC<RemediationComplexityProps> = ({
  auditId,
}) => {
  const paramId = useParams().auditId;
  if (!auditId) {
    auditId = paramId;
  }

  const [complexityData, setComplexityData] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const fetchAuditData = async () => {
      if (!auditId) {
        return;
      }

      try {
        const dataAudit = await getAuditById(auditId);
        const findings = dataAudit.datas.findings;
        const counts = [0, 0, 0];
        findings.forEach((finding: { remediationComplexity?: number }) => {
          if (
            finding.remediationComplexity !== undefined &&
            finding.remediationComplexity >= 1 &&
            finding.remediationComplexity <= 3
          ) {
            counts[finding.remediationComplexity - 1] += 1;
          }
        });
        setComplexityData(counts);
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };
    if (auditId) {
      fetchAuditData().catch(console.error);
    }
  }, [auditId]);

  const data = {
    labels: [t('easy'), t('medium'), t('complex')],
    datasets: [
      {
        data: complexityData,
        backgroundColor: ['#2ECC40', '#FFDC00', '#FF4136'],
      },
    ],
  };

  const maxCount = Math.max(...complexityData) + 2;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: maxCount,
        ticks: {
          stepSize: 1,
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
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
      datalabels: {
        formatter: () => '',
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="chart-container" style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RemediationComplexity;
