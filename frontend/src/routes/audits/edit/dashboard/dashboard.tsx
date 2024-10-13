/* eslint-disable import/extensions */
import { t } from 'i18next';
import { useState } from 'react';

import CheckboxButton from '@/components/button/CheckboxButton';
import PrimaryButton from '@/components/button/PrimaryButton';
import AverageCVSS from '@/components/dashboard/AverageCVSS';
import CIATriad from '@/components/dashboard/CIATriad';
import CVSSScore from '@/components/dashboard/CVSSScore';
import RemediationComplexity from '@/components/dashboard/RemediationComplexity';
import RemediationPriority from '@/components/dashboard/RemediationPriority';
import Sidebar from '@/components/dashboard/Sidebar';
import Modal from '@/components/modal/Modal';

export const Dashboard = () => {
  const [activeView, setActiveView] = useState('cvss-score');

  const [isOpenExportModal, setIsOpenExportModal] = useState(false);

  const [dashboardCheckboxs, setDashboardCheckboxs] = useState({
    cvssScore: false,
    remediationPriority: false,
    remediationComplexity: false,
    averageCvss: false,
    ciaTriad: false,
  });

  const handleSubmitExport = async () => {};

  const handleCancelExport = () => {
    setDashboardCheckboxs({
      cvssScore: false,
      remediationPriority: false,
      remediationComplexity: false,
      averageCvss: false,
      ciaTriad: false,
    });
    setIsOpenExportModal(false);
  };

  const handleCheckboxChange = (
    key: string,
    value: React.SetStateAction<boolean>,
  ) => {
    setDashboardCheckboxs(prev => ({
      ...prev,
      [key]: value,
    }));
  };

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

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <PrimaryButton
              onClick={() => setIsOpenExportModal(!isOpenExportModal)}
            >
              {t('export')}
            </PrimaryButton>
          </div>
          {renderView()}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Filters:</h2>
            <div className="flex space-x-4">
              {['FILTRO 1', 'FILTRO 2', 'FILTRO 3', 'FILTRO 4'].map(
                (filter, index) => (
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    key={index}
                    type="button"
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenExportModal}
        onCancel={handleCancelExport}
        onSubmit={handleSubmitExport}
        submitText={t('btn.confirm')}
        title="Select the data visualization you want to export:"
      >
        <>
          <div className="mb-4">
            <CheckboxButton
              checked={dashboardCheckboxs.cvssScore}
              onChange={value => handleCheckboxChange('cvssScore', value)}
              text={t('cvssScore')}
            />
          </div>
          <div className="mb-4">
            <CheckboxButton
              checked={dashboardCheckboxs.remediationPriority}
              onChange={value =>
                handleCheckboxChange('remediationPriority', value)
              }
              text={t('remediationPriority')}
            />
          </div>
          <div className="mb-4">
            <CheckboxButton
              checked={dashboardCheckboxs.remediationComplexity}
              onChange={value =>
                handleCheckboxChange('remediationComplexity', value)
              }
              text={t('remediationComplexity')}
            />
          </div>
          <div className="mb-4">
            <CheckboxButton
              checked={dashboardCheckboxs.averageCvss}
              onChange={value => handleCheckboxChange('averageCvss', value)}
              text="Average CVSS"
            />
          </div>
          <div className="mb-4">
            <CheckboxButton
              checked={dashboardCheckboxs.ciaTriad}
              onChange={value => handleCheckboxChange('ciaTriad', value)}
              text="CIA Triad"
            />
          </div>
        </>
      </Modal>
    </>
  );
};
