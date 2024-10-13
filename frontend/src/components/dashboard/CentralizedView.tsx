import React from 'react';

import AverageCVSS from './AverageCVSS';
import CIATriad from './CIATriad';
import CVSSScore from './CVSSScore';
import RemediationComplexity from './RemediationComplexity';
import RemediationPriority from './RemediationPriority';

type CentralizedViewProps = {
  selectedDisplays: string[];
  auditId: string;
};

const CentralizedView: React.FC<CentralizedViewProps> = ({
  selectedDisplays,
  auditId,
}) => {
  const components: Record<string, React.FC<{ auditId?: string }>> = {
    'cvss-score': CVSSScore,
    'remediation-priority': RemediationPriority,
    'remediation-complexity': RemediationComplexity,
    'average-cvss': AverageCVSS,
    'cia-triad': CIATriad,
  } as const;

  return (
    <div className="centralized-view bg-gray-800 text-white p-4">
      {selectedDisplays.map(displayId => {
        const Component = components[displayId];
        return (
          <div className="mb-8" id={displayId} key={displayId}>
            <h2 className="text-xl font-bold mb-4">
              {displayId.replace(/-/g, ' ').toUpperCase()}
            </h2>
            <Component auditId={auditId} />
          </div>
        );
      })}
    </div>
  );
};

export default CentralizedView;
