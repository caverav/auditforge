/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/extensions */
import {
  cvssStringToCIA,
  cvssStringToScore,
  cvssStringToSeverity,
} from '@/lib/utils';

import { Finding, getAuditById } from './audits';

export const exportToCSV = (
  auditName: string,
  selectedDisplays: string[],
  auditId: string,
) => {
  const complexityData = { easy: 0, medium: 0, complex: 0 };
  const priorityData = { low: 0, medium: 0, high: 0, urgent: 0 };
  let findings: Finding[];
  const csvRows: string[] = [];
  csvRows.push('title,label,value');

  const fetchAuditData = async () => {
    if (!auditId) {
      return;
    }

    try {
      const dataAudit = await getAuditById(auditId);
      findings = dataAudit.datas.findings;
    } catch (error) {
      console.error('Error fetching audit data:', error);
      return;
    }
  };
  if (auditId) {
    void fetchAuditData()
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        let RC = false;
        let RP = false;
        findings.forEach((finding: Finding) => {
          for (let i = 0; i < selectedDisplays.length; i++) {
            if (
              selectedDisplays[i] === 'remediation-complexity' &&
              finding.remediationComplexity >= 1 &&
              finding.remediationComplexity <= 3
            ) {
              RC = true;
              switch (finding.remediationComplexity) {
                case 1: {
                  complexityData.easy += 1;
                  break;
                }

                case 2: {
                  complexityData.medium += 1;
                  break;
                }

                case 3: {
                  complexityData.complex += 1;
                  break;
                }
              }
            } else if (
              selectedDisplays[i] === 'remediation-priority' &&
              finding.priority >= 1 &&
              finding.priority <= 4
            ) {
              RP = true;
              switch (finding.priority) {
                case 1: {
                  priorityData.low += 1;
                  break;
                }

                case 2: {
                  priorityData.medium += 1;
                  break;
                }

                case 3: {
                  priorityData.high += 1;
                  break;
                }

                case 4: {
                  priorityData.urgent += 1;
                  break;
                }
              }
            }
          }
        });
        if (selectedDisplays.find(item => item === 'average-cvss')) {
          const AVERAGE_CVSS =
            Math.round(
              (findings.reduce(
                (acc, finding) => acc + cvssStringToScore(finding.cvssv3),
                0,
              ) /
                findings.length) *
                10,
            ) / 10;
          const findingScores = findings.map(finding => ({
            label: finding.title,
            value: cvssStringToScore(finding.cvssv3),
          }));
          csvRows.push(`average-cvss,average,${AVERAGE_CVSS}`);
          findingScores.map(fs =>
            csvRows.push(`average-cvss,${fs.label},${fs.value}`),
          );
        }
        if (selectedDisplays.find(item => item === 'cvss-score')) {
          const cvssScore = {
            C: findings.filter(
              finding => cvssStringToSeverity(finding.cvssv3) === 'C',
            ).length,
            H: findings.filter(
              finding => cvssStringToSeverity(finding.cvssv3) === 'H',
            ).length,
            M: findings.filter(
              finding => cvssStringToSeverity(finding.cvssv3) === 'M',
            ).length,
            L: findings.filter(
              finding => cvssStringToSeverity(finding.cvssv3) === 'L',
            ).length,
            I: findings.filter(
              finding => cvssStringToSeverity(finding.cvssv3) === 'I',
            ).length,
          };
          csvRows.push(`cvssScore,C,${cvssScore.C}`);
          csvRows.push(`cvssScore,H,${cvssScore.H}`);
          csvRows.push(`cvssScore,M,${cvssScore.M}`);
          csvRows.push(`cvssScore,L,${cvssScore.L}`);
          csvRows.push(`cvssScore,I,${cvssScore.I}`);
        }
        if (selectedDisplays.find(item => item === 'cia-triad')) {
          const data = findings.map(finding => ({
            label: finding.title,
            C: cvssStringToCIA('confidentiality', finding.cvssv3),
            I: cvssStringToCIA('integrity', finding.cvssv3),
            A: cvssStringToCIA('availability', finding.cvssv3),
          }));

          data.map(cia =>
            csvRows.push(
              `cia-triad,${cia.label},C${cia.C ?? 0} I${cia.I ?? 0} A${cia.A ?? 0}`,
            ),
          );
        }
        if (RP) {
          csvRows.push(`remediationPriority,LOW,${priorityData.low}`);
          csvRows.push(`remediationPriority,MEDIUM,${priorityData.medium}`);
          csvRows.push(`remediationPriority,HIGH,${priorityData.high}`);
          csvRows.push(`remediationPriority,URGENT,${priorityData.urgent}`);
        }
        if (RC) {
          csvRows.push(`remediationComplexity,EASY,${complexityData.easy}`);
          csvRows.push(`remediationComplexity,MEDIUM,${complexityData.medium}`);
          csvRows.push(
            `remediationComplexity,COMPLEX,${complexityData.complex}`,
          );
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${auditName}_dashboard.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      });
  }
};
