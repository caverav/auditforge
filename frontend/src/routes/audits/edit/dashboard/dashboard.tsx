/* eslint-disable import/extensions */
import { t } from 'i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PrimaryButton from '@/components/button/PrimaryButton';
import AverageCVSS from '@/components/dashboard/AverageCVSS';
import CIATriad from '@/components/dashboard/CIATriad';
import CVSSScore from '@/components/dashboard/CVSSScore';
import ExportModal from '@/components/dashboard/ExportModal';
import RemediationComplexity from '@/components/dashboard/RemediationComplexity';
import RemediationPriority from '@/components/dashboard/RemediationPriority';
import Sidebar from '@/components/dashboard/Sidebar';
import { exportToPDF } from '@/services/exportToPDF';

export const Dashboard = () => {
  const { auditId } = useParams();
  const [activeView, setActiveView] = useState('cvss-score');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedDisplays, setSelectedDisplays] = useState<string[]>([]);
  const [auditName, setAuditName] = useState('AuditForge Report');
  const displays = [
    { id: 'cvss-score', name: 'CVSS Score', component: CVSSScore },
    {
      id: 'remediation-priority',
      name: 'Remediation Priority',
      component: RemediationPriority,
    },
    {
      id: 'remediation-complexity',
      name: 'Remediation Complexity',
      component: RemediationComplexity,
    },
    { id: 'average-cvss', name: 'Average CVSS', component: AverageCVSS },
    { id: 'cia-triad', name: 'CIA Triad', component: CIATriad },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'cvss-score':
        return <CVSSScore />;

      case 'remediation-priority':
        return <RemediationPriority />;

      case 'remediation-complexity':
        return <RemediationComplexity />;

      case 'average-cvss':
        return <AverageCVSS />;

      case 'cia-triad':
        return <CIATriad />;
    }
  };
  const handleExportClick = () => {
    setSelectedDisplays(displays.map(d => d.id));
    setIsExportModalOpen(true);
  };

  const handleExportConfirm = async () => {
    setIsExportModalOpen(false);
    await exportToPDF(auditName, selectedDisplays, auditId ?? '', displays);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <PrimaryButton onClick={handleExportClick}>
              {t('export')}
            </PrimaryButton>
          </div>
          {renderView()}
        </div>
      </div>
      <ExportModal
        auditName={auditName}
        displays={displays}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={handleExportConfirm}
        selectedDisplays={selectedDisplays}
        setAuditName={setAuditName}
        setSelectedDisplays={setSelectedDisplays}
      />
    </>
  );
};
