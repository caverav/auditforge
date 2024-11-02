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
import { Cvss3P1 } from 'ae-cvss-calculator';

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

//const timeData = [
//  { name: 'Audit 1', execution: 4, remediation: 2 },
//  { name: 'Audit 2', execution: 3, remediation: 2.5 },
//  { name: 'Audit 3', execution: 5, remediation: 1.5 },
//];
//
//const ciaData = [
//  { subject: 'Confidentiality', current: 80, target: 95 },
//  { subject: 'Integrity', current: 85, target: 90 },
//  { subject: 'Availability', current: 75, target: 85 },
//];
//
//const cvssData = [
//  { name: 'Audit 1', score: 7.5 },
//  { name: 'Audit 2', score: 5.2 },
//  { name: 'Audit 3', score: 8.1 },
//];
//
//const priorityData = [
//  { name: 'Low', count: 5, color: '#28a745' },
//  { name: 'Medium', count: 8, color: '#ffc107' },
//  { name: 'High', count: 6, color: '#fd7e14' },
//  { name: 'Urgent', count: 4, color: '#dc3545' },
//];
export const ClientDashboard = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientsInfo[]>([]);
  const [clientName, setClientName] = useState<ListItem[]>([]);
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
        setAudits(data);
      } catch (error) {
        console.error('Error fetching audits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditsbyClient()
      .then(() => {})
      .catch(console.error);
    const fetchAuditData = async () => {
      setLoading(true);

      try {
        for (const audit of audits) {
          const auditData = await getAuditById(audit._id);
          const tmpSeverityData = severityData;
          for (const finding of auditData.datas.findings) {
            const severity = severityByScore(cvssStringToScore(finding.cvssv3));
            tmpSeverityData[severity].value += 1;

            for (const cwe of finding.cwes) {
              const cweItem = cweItems.find(item => item.id === cwe);
              setCweItems(prev => [
                ...prev,
                { id: cwe, size: cweItem ? cweItem.size + 1 : 1 },
              ]);
            }
          }
          setSeverityData(tmpSeverityData);
        }
      } catch (error) {
        console.error('Error fetching audits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditData()
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
          <SeverityPieChart data={severityData} total={23} />
        </Card>
        <Card title="Times per audit">
          <TimePerAuditChart data={timeData} />
        </Card>
        <Card title="CWEs found">
          <CWECloud
            items={cweItems}
            mostCommon="CWE-20 'Improper Input Validation'"
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
