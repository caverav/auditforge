import DropdownButton from '@/components/button/DropdownButton';
import { Client, getClients } from '../../services/audits';

import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';

import { getAuditsByClientName } from '../../services/clients'

import { t } from 'i18next';
import SelectDropdown from '@/components/dropdown/SelectDropdown';

type ClientData = {
  status: string;
  datas: Client[];
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

  const [audits, setAudits] = useState<any[]>([]);
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
      const data = await getClients();
      const listItems: ClientsInfo[] = data.datas.map((cliente, index) => ({
        id: index,
        value: {
          id: cliente._id,
          nombre: cliente.firstname + ' ' + cliente.lastname,
        },
      }));
      setClientInfo(listItems);
      const clientName: ListItem[] = data.datas.map((cliente, index) => ({
        id: index,
        value: cliente.firstname + ' ' + cliente.lastname,
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
  }, [currentClient]);

  return (
    <div className="m-10">
      <Card title="Client">
        <SelectDropdown
          items={clientName}
          onChange={setCurrentClient}
          placeholder={t('Select your client')}
          selected={currentClient}
          title=""
        />
      </Card>
    </div>
  );
};
