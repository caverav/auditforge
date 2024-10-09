import { useState } from 'react';

import AverageCVSS from '@/components/dashboard/AverageCVSS';
import CIATriad from '@/components/dashboard/CIATriad';
import Collaborators from '@/components/dashboard/Collaborators';
import CVSSScore from '@/components/dashboard/CVSSScore';
import RemediationPriority from '@/components/dashboard/RemediationPriority';
import Sidebar from '@/components/dashboard/Sidebar';

export const Dashboard = () => {
  const [activeView, setActiveView] = useState('cvss-score');

  const renderView = () => {
    switch (activeView) {
      case 'cvss-score':
        return <CVSSScore />;

      case 'remediation-priority':
        return <RemediationPriority />;

      case 'collaborators':
        return <Collaborators />;

      case 'average-cvss':
        return <AverageCVSS />;

      case 'cia-triad':
        return <CIATriad />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Export
          </button>
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
  );
};
