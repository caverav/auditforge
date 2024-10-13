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

const RemediationPriority: React.FC = () => {
  const { auditId } = useParams();

  const [priorityData, setPriorityData] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const fetchAuditData = async () => {
      if (!auditId) {
        return;
      }

      try {
        const dataAudit = await getAuditById(auditId);
        const findings = dataAudit.datas.findings;
        const counts = [0, 0, 0, 0];
        findings.forEach((finding: { priority: number }) => {
          if (finding.priority >= 1 && finding.priority <= 4) {
            counts[finding.priority - 1] += 1;
          }
        });
        setPriorityData(counts);
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };
    if (auditId) {
      fetchAuditData().catch(console.error);
    }
  }, [auditId]);

  const data = {
    labels: [t('low'), t('medium'), t('high'), t('urgent')],
    datasets: [
      {
        data: priorityData,
        backgroundColor: ['#2ECC40', '#FFDC00', '#FF851B', '#FF4136'],
      },
    ],
  };

  const maxCount = Math.max(...priorityData) + 2;

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

export default RemediationPriority;
