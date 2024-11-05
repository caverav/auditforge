import { Cvss3P1 } from 'ae-cvss-calculator';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getAuditById } from '@/services/audits';

ChartJS.register(ArcElement, Tooltip, Legend);

const cvssStringToSeverity = (cvssScore: string) => {
  try {
    const cvssVector = new Cvss3P1(cvssScore);
    const score = cvssVector.calculateExactOverallScore();
    if (score >= 9.0) {
      return 'C';
    }
    if (score >= 7.0) {
      return 'H';
    }
    if (score >= 4.0) {
      return 'M';
    }
    if (score >= 0.1) {
      return 'L';
    }
  } catch (error) {
    console.error('Invalid CVSS vector:', error);
  }
  return 'I';
};

type CVSSScoreProps = {
  auditId?: string;
};

const CVSSScore: React.FC<CVSSScoreProps> = ({ auditId }) => {
  const paramId = useParams().auditId;
  if (!auditId) {
    auditId = paramId;
  }
  const [pieChartData, setPieChartData] = useState({
    labels: [
      t('critical'),
      t('cvss.high'),
      t('cvss.medium'),
      t('cvss.low'),
      'Informative',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40'],
        borderColor: ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40'],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    getAuditById(auditId)
      .then(audit => {
        setPieChartData({
          labels: [
            t('critical'),
            t('cvss.high'),
            t('cvss.medium'),
            t('cvss.low'),
            'Informative',
          ],
          datasets: [
            {
              data: [
                audit.datas.findings.filter(
                  finding => cvssStringToSeverity(finding.cvssv3 ?? '') === 'C',
                ).length,
                audit.datas.findings.filter(
                  finding => cvssStringToSeverity(finding.cvssv3 ?? '') === 'H',
                ).length,
                audit.datas.findings.filter(
                  finding => cvssStringToSeverity(finding.cvssv3 ?? '') === 'M',
                ).length,
                audit.datas.findings.filter(
                  finding => cvssStringToSeverity(finding.cvssv3 ?? '') === 'L',
                ).length,
                audit.datas.findings.filter(
                  finding => cvssStringToSeverity(finding.cvssv3 ?? '') === 'I',
                ).length,
              ],
              backgroundColor: [
                '#FF4136',
                '#FF851B',
                '#FFDC00',
                '#2ECC40',
                '#53AA33',
              ],
              borderColor: [
                '#FF4136',
                '#FF851B',
                '#FFDC00',
                '#2ECC40',
                '#53AA33',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(console.error);
  }, [auditId]);

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="chart-container" style={{ height: '400px' }}>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default CVSSScore;
