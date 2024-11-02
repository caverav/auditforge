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
import { Audit, Company } from '@/services/audits';
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

export const ClientDashboard = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientsInfo[]>([]);
  const [clientName, setClientName] = useState<ListItem[]>([]);
  const [currentClient, setCurrentClient] = useState<ListItem>({
    id: 0,
    value: '',
  });

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
        console.log(data);
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
  const severityData = [
    { name: 'Critical', value: 4, color: '#dc3545' },
    { name: 'High', value: 6, color: '#fd7e14' },
    { name: 'Medium', value: 8, color: '#ffc107' },
    { name: 'Low', value: 5, color: '#28a745' },
  ];

  const cweItems = [
    { id: 'CWE-89', size: 15 },
    { id: 'CWE-79', size: 12 },
    { id: 'CWE-22', size: 10 },
    // ... more CWEs
  ];

  const timeData = [
    { name: 'Audit 1', execution: 4, remediation: 2 },
    { name: 'Audit 2', execution: 3, remediation: 2.5 },
    { name: 'Audit 3', execution: 5, remediation: 1.5 },
  ];

  const ciaData = [
    { subject: 'Confidentiality', current: 80, target: 95 },
    { subject: 'Integrity', current: 85, target: 90 },
    { subject: 'Availability', current: 75, target: 85 },
  ];

  const cvssData = [
    { name: 'Audit 1', score: 7.5 },
    { name: 'Audit 2', score: 5.2 },
    { name: 'Audit 3', score: 8.1 },
  ];

  const priorityData = [
    { name: 'Low', count: 5, color: '#28a745' },
    { name: 'Medium', count: 8, color: '#ffc107' },
    { name: 'High', count: 6, color: '#fd7e14' },
    { name: 'Urgent', count: 4, color: '#dc3545' },
  ];

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
