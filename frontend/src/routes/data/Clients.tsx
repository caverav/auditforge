import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import {
  createClient,
  createCollaborator,
  getClients,
  getCollaborators,
  getCompanies,
} from '../../services/data';

type NewClient = {
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  phone: string;
  cell: string;
};

// Las compañias deben obtenerse desde el backend
const companiesOptions = [
  { id: 1, value: 'ntg' },
  { id: 2, value: 'ibox' },
  { id: 3, value: 'pwndoc' },
];

export const Clients: React.FC = () => {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState(companiesOptions);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const [newClient, setNewClient] = useState<NewClient | null>({
    company: '',
    firstname: '',
    lastname: '',
    email: '',
    title: '',
    phone: '',
    cell: '',
  });

  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenAddCollabModal, setIsOpenAddCollabModal] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching clients');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleCancelAddCollab = () => {
    setNewClient(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleSubmitAddCollab = async () => {
    try {
      await createClient(newClient!);
    } catch (error) {
      setError('Error creating client');
      console.error('Error:', error);
    }
    setNewClient(null);
    setIsOpenAddCollabModal(!isOpenAddCollabModal);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewClient(prevState => ({
      ...prevState!,
      [name]: value,
    }));
  };

  return (
    <>
      <Card title={t('clients')}>
        <>
          <PrimaryButton
            onClick={() => setIsOpenAddCollabModal(!isOpenAddCollabModal)}
          >
            {t('addClient')}
          </PrimaryButton>
          <div>tarjetaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div>{loading ? 'cargandooo' : JSON.stringify(clients)}</div>
        </>
      </Card>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddCollabModal}
        onCancel={handleCancelAddCollab}
        onSubmit={handleSubmitAddCollab}
        submitText={t('btn.create')}
        title={t('addClient')}
      >
        <>
          <SelectDropdown
            items={companies}
            onChange={setSelectedCompany}
            selected={selectedCompany}
            title={t('company')}
          />
          <SimpleInput
            id="firstname"
            label={t('firstname')}
            name="firstname"
            onChange={value => handleInputChange('firstname', value)}
            placeholder={t('firstname')}
            type="text"
            value={newClient?.firstname || ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
            type="text"
            value={newClient?.lastname || ''}
          />
          <SimpleInput
            id="email"
            label={t('email')}
            name="email"
            onChange={value => handleInputChange('email', value)}
            placeholder={t('email')}
            type="text"
            value={newClient?.email || ''}
          />
          <SimpleInput
            id="title"
            label={t('title')}
            name="title"
            onChange={value => handleInputChange('title', value)}
            placeholder={t('title')}
            type="text"
            value={newClient?.title || ''}
          />
          <SimpleInput
            id="phone"
            label={t('phone')}
            name="phone"
            onChange={value => handleInputChange('phone', value)}
            placeholder={t('phone')}
            type="text"
            value={newClient?.phone || ''}
          />
          <SimpleInput
            id="cell"
            label={t('cell')}
            name="cell"
            onChange={value => handleInputChange('cell', value)}
            placeholder={t('cell')}
            type="text"
            value={newClient?.cell || ''}
          />
        </>
      </Modal>
    </>
  );
};
