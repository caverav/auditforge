import { Cvss3P1 } from 'ae-cvss-calculator';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import Card from '@/components/card/Card';
import { CIATriadChart } from '@/components/charts/CIATriadChart';
import { CVSSChart } from '@/components/charts/CVSSChart';
import { CWECloud } from '@/components/charts/CWECloud';
import { RemediationPriorityChart } from '@/components/charts/RemediationPriorityChart';
import { SeverityPieChart } from '@/components/charts/SeverityPieChart';
import { TimePerAuditChart } from '@/components/charts/TimePerAuditChart';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import { Audit, Company, getAuditById } from '@/services/audits';
import { getAuditsByClientName } from '@/services/clients';
import { getCompanies } from '@/services/data';

type ClientData = {
  status: string;
  datas: Company[];
};

type ClientsInfo = {
  id: number;
  value: { id: string; nombre: string };
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

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

const cvssStringToScore = (cvssScore: string) => {
  try {
    const cvssVector = new Cvss3P1(cvssScore);
    return cvssVector.calculateExactOverallScore();
  } catch (error) {
    console.error('Invalid CVSS vector:', error);
  }
  return 0;
};

const severityByScore = (score: number) => {
  if (score >= 9.0) {
    return 0;
  } else if (score >= 7.0) {
    return 1;
  } else if (score >= 4.0) {
    return 2;
  } else if (score >= 0.1) {
    return 3;
  } else {
    return 4;
  }
};

export const ClientDashboard = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientsInfo[]>([]);
  const [clientName, setClientName] = useState<ListItem[]>([]);
  const [totalSeverity, setTotalSeverity] = useState(0);
  const [currentClient, setCurrentClient] = useState<ListItem>({
    id: 0,
    value: '',
  });
  const [severityData, setSeverityData] = useState<
    { name: string; value: number; color: string }[]
  >([
    { name: 'Critical', value: 0, color: '#dc3545' },
    { name: 'High', value: 0, color: '#fd7e14' },
    { name: 'Medium', value: 0, color: '#ffc107' },
    { name: 'Low', value: 0, color: '#28a745' },
    { name: 'Informative', value: 0, color: '#6c757d' },
  ]);
  const [cweItems, setCweItems] = useState<{ id: string; size: number }[]>([]);
  const [timeData, setTimeData] = useState<
    {
      name: string;
      execution: number;
      remediation: number;
    }[]
  >([]);
  const [ciaData, setCiaData] = useState<
    {
      subject: string;
      current: number;
      target: number;
    }[]
  >([
    { subject: 'Confidentiality', current: 0, target: 0 },
    { subject: 'Integrity', current: 0, target: 0 },
    { subject: 'Availability', current: 0, target: 0 },
  ]);
  const [cvssData, setCvssData] = useState<
    {
      name: string;
      score: number;
    }[]
  >([]);
  const [priorityData, setPriorityData] = useState<
    {
      name: string;
      count: number;
      color: string;
    }[]
  >([
    { name: 'Low', count: 0, color: '#28a745' },
    { name: 'Medium', count: 0, color: '#ffc107' },
    { name: 'High', count: 0, color: '#fd7e14' },
    { name: 'Urgent', count: 0, color: '#dc3545' },
  ]);
  const fetchClients = async () => {
    setLoading(true);

    try {
      const data = await getCompanies();
      const listItems: ClientsInfo[] = data.datas.map((cliente, index) => ({
        id: index,
        value: {
          id: cliente._id,
          nombre: cliente.name,
        },
      }));
      setClientInfo(listItems);
      const clientName: ListItem[] = data.datas.map((cliente, index) => ({
        id: index,
        value: cliente.name,
      }));
      setClientName(clientName);
    } catch (error) {
      console.error('Error fetching audits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients()
      .then(() => {})
      .catch(console.error);

    const fetchAuditsbyClient = async () => {
      setLoading(true);

      try {
        const data = await getAuditsByClientName(currentClient.value);
        const tmpCiaData = [
          { subject: 'Confidentiality', current: 0, target: 0 },
          { subject: 'Integrity', current: 0, target: 0 },
          { subject: 'Availability', current: 0, target: 0 },
        ];
        let findingcount = 0;
        let prioritycount = 0;
        const tmpCvssData: { name: string; score: number }[] = [];
        const tmpPriorityData: {
          name: string;
          count: number;
          color: string;
        }[] = [
          { name: 'Low', count: 0, color: '#28a745' },
          { name: 'Medium', count: 0, color: '#ffc107' },
          { name: 'High', count: 0, color: '#fd7e14' },
          { name: 'Urgent', count: 0, color: '#dc3545' },
        ];
        const tmpSeverityData = [
          { name: 'Critical', value: 0, color: '#dc3545' },
          { name: 'High', value: 0, color: '#fd7e14' },
          { name: 'Medium', value: 0, color: '#ffc107' },
          { name: 'Low', value: 0, color: '#28a745' },
          { name: 'Informative', value: 0, color: '#6c757d' },
        ];
        const tmpCweItems: { id: string; size: number }[] = [];
        for (const audit of data) {
          const auditData = await getAuditById(audit._id);
          for (const finding of auditData.datas.findings) {
            // severity data
            const severity = severityByScore(cvssStringToScore(finding.cvssv3));
            tmpSeverityData[severity].value += 1;

            // cwe data
            for (const cwe of finding.cwes) {
              const cweItem = tmpCweItems.find(item => item.id === cwe);
              if (cweItem) {
                tmpCweItems.map(item => {
                  if (item.id === cwe) {
                    item.size += 1;
                  }
                });
              } else {
                tmpCweItems.push({ id: cwe, size: 1 });
              }
            }
            // time data
            // TODO: add time data

            // cia data and cvss data and priority data
            if (finding.cvssv3) {
              tmpCiaData[0].current += cvssStringTo(
                'confidentiality',
                finding.cvssv3,
              );
              tmpCiaData[1].current += cvssStringTo(
                'integrity',
                finding.cvssv3,
              );
              tmpCiaData[2].current += cvssStringTo(
                'availability',
                finding.cvssv3,
              );
              findingcount += 1;

              const item = tmpCvssData.find(
                item => item.name === auditData.datas.name,
              );
              if (item) {
                item.score += cvssStringToScore(finding.cvssv3);
              } else {
                tmpCvssData.push({
                  name: auditData.datas.name,
                  score: cvssStringToScore(finding.cvssv3),
                });
              }

              const priority = finding.priority;
              if (priority) {
                tmpPriorityData[priority].count += 1;
                prioritycount += 1;
              }
            }
          }
        }

        setSeverityData(tmpSeverityData);
        setTotalSeverity(
          tmpSeverityData.reduce((acc, item) => acc + item.value, 0),
        );
        tmpCiaData.forEach(item => {
          item.current /= findingcount;
        });
        tmpCvssData.forEach(item => {
          item.score /= findingcount;
        });
        tmpPriorityData.forEach(item => {
          item.count /= prioritycount;
        });
        setPriorityData(tmpPriorityData);
        setCvssData(tmpCvssData);
        setCweItems(tmpCweItems);
        setCiaData(tmpCiaData);
      } catch (error) {
        console.error('Error fetching audits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditsbyClient()
      .then(() => {})
      .catch(console.error);
  }, [currentClient]);

  return (
    <div className="p-8">
      <Card title="Client">
        <SelectDropdown
          items={clientName}
          onChange={setCurrentClient}
          placeholder={t('Select your client')}
          selected={currentClient}
          title=""
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card title="Vulnerabilities by severity">
          <SeverityPieChart data={severityData} total={totalSeverity} />
        </Card>
        <Card title="Times per audit">
          <TimePerAuditChart data={timeData} />
        </Card>
        <Card title="CWEs found">
          <CWECloud
            items={cweItems}
            mostCommon={cweItems.sort((a, b) => b.size - a.size)[0].id}
          />
        </Card>
        <Card title="Average CIA triad">
          <CIATriadChart data={ciaData} />
        </Card>
        <Card title="Average CVSS">
          <CVSSChart data={cvssData} />
        </Card>
        <Card title="Average Remediation Priority">
          <RemediationPriorityChart data={priorityData} />
        </Card>
      </div>
    </div>
  );
};
