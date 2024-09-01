import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import UITable from '../../components/table/UITable';
import { useSortableTable } from '../../hooks/useSortableTable';
import { useTableFiltering } from '../../hooks/useTableFiltering';
import {
  Client,
  createClient,
  deleteClient,
  getClients,
  getCompanies,
  NewClient,
  updateClient,
} from '../../services/data';

type Company = {
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
};

type TableData = {
  _id: string;
  email: string;
  lastname: string;
  firstname: string;
  phone: string;
  cell: string;
  title: string;
  company: string;
};

type ListItem = {
  id: number;
  _id?: string;
  name?: string;
  shortName?: string;
  logo?: string;
  value: string;
};

export const Clients: React.FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      header: t('firstname'),
      accessor: 'firstname',
      sortable: true,
      filterable: true,
    },
    {
      header: t('lastname'),
      accessor: 'lastname',
      sortable: true,
      filterable: true,
    },
    { header: t('email'), accessor: 'email', sortable: true, filterable: true },
    {
      header: t('company'),
      accessor: 'company',
      sortable: true,
      render: (data?: { name: string }) => data?.name ?? '-',
    },
  ];

  const [companies, setCompanies] = useState<ListItem[]>([]);
  const [apiCompanies, setApiCompanies] = useState<Company[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<ListItem>({
    id: 0,
    _id: '',
    value: '',
  });

  const [newClient, setNewClient] = useState<NewClient | null>({
    company: null,
    firstname: '',
    lastname: '',
    email: '',
    title: '',
    phone: '',
    cell: '',
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);

  const [selectedClient, setSelectedClient] = useState<TableData | null>(null);

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    clients,
    columns, // error en useSortableTable o UITable
  );

  const [isOpenAddClientModal, setIsOpenAddClientModal] = useState(false);
  const [isOpenEditClientModal, setIsOpenEditClientModal] = useState(false);
  const [isOpenDeleteClientModal, setIsOpenDeleteClientModal] = useState(false);

  const fetchClients = useCallback(async () => {
    try {
      const data = await getClients();
      setClients(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError('Error fetching clients');
      setLoading(false);
    }
  }, [setTableData]);

  const fetchCompanies = async () => {
    try {
      const data: { datas: Company[] } = await getCompanies();
      const filteredData = data.datas.map((item, index) => ({
        id: index + 1,
        _id: item._id ?? '',
        value: item.name,
      }));
      setCompanies(filteredData);
      setApiCompanies(data.datas);
      setSelectedCompany(filteredData[0]);
      setLoading(false);
    } catch (err) {
      setError('Error fetching company');
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchClients();
    void fetchCompanies();
  }, [fetchClients]);

  const keyExtractor = (item: TableData) => item._id;

  const handleEditClientButton = (client: TableData) => {
    const matchingCompany = apiCompanies.find(
      company => company.name === client.company,
    );

    setNewClient({
      _id: client._id,
      email: client.email,
      lastname: client.lastname,
      firstname: client.firstname,
      phone: client.phone,
      cell: client.cell,
      title: client.title,
      company: matchingCompany
        ? {
            _id: matchingCompany._id,
            name: matchingCompany.name,
            shortName: matchingCompany.shortName,
            logo: matchingCompany.logo,
          }
        : null,
    });
    setIsOpenEditClientModal(!isOpenEditClientModal);
  };

  const handleDeleteClientButton = (client: TableData) => {
    setSelectedClient(client);
    setIsOpenDeleteClientModal(!isOpenDeleteClientModal);
  };

  const rowActions = [
    {
      label: 'Edit',
      onClick: (item: TableData) => handleEditClientButton(item),
    },
    {
      label: 'Delete',
      onClick: (item: TableData) => handleDeleteClientButton(item),
    },
  ];

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    clients,
    columns, // error en useSortableTable o UITable
    setTableData,
  );

  const handleCancelAddClient = () => {
    setNewClient(null);
    setIsOpenAddClientModal(!isOpenAddClientModal);
  };

  const handleSubmitAddClient = async () => {
    if (!newClient) {
      return;
    }

    if (
      selectedCompany.id === 0 &&
      selectedCompany.value === '' &&
      selectedCompany._id === ''
    ) {
      return;
    }

    try {
      const matchingCompany = apiCompanies.find(
        company => company._id === selectedCompany._id,
      );

      if (!matchingCompany) {
        setError('Selected company not found');
        return;
      }

      const clientToCreate = {
        ...newClient,
        company: {
          _id: matchingCompany._id,
          name: matchingCompany.name,
          shortName: matchingCompany.shortName,
          logo: matchingCompany.logo,
        },
      };
      await createClient(clientToCreate);
      toast.success(t('msg.clientCreatedOk'));
    } catch (error) {
      setError('Error creating client');
      console.error('Error:', error);
    }
    setNewClient(null);
    setIsOpenAddClientModal(!isOpenAddClientModal);
    void fetchClients();
  };

  const handleCancelEditClient = () => {
    setNewClient(null);
    setIsOpenEditClientModal(!isOpenEditClientModal);
  };

  const handleSubmitEditClient = async () => {
    if (!newClient) {
      return;
    }

    if (
      selectedCompany.id === 0 &&
      selectedCompany.value === '' &&
      selectedCompany._id === ''
    ) {
      return;
    }

    try {
      const matchingCompany = apiCompanies.find(
        company => company._id === selectedCompany._id,
      );

      if (!matchingCompany) {
        setError('Selected company not found');
        return;
      }

      const clientToUpdate = {
        ...newClient,
        company: {
          _id: matchingCompany._id,
          name: matchingCompany.name,
          shortName: matchingCompany.shortName,
          logo: matchingCompany.logo,
        },
      };

      await updateClient(clientToUpdate);
      toast.success(t('msg.clientUpdatedOk'));
    } catch (error) {
      setError('Error updating client');
      console.error('Error:', error);
    }
    setNewClient(null);
    setIsOpenEditClientModal(!isOpenEditClientModal);
    void fetchClients();
  };

  const handleCancelDeleteClient = () => {
    setIsOpenDeleteClientModal(!isOpenDeleteClientModal);
  };

  const handleSubmitDeleteClient = async () => {
    if (selectedClient?._id) {
      try {
        await deleteClient(selectedClient._id);
        toast.success(t('msg.clientDeletedOk'));
      } catch (error) {
        setError('Error deleting client');
        console.error('Error:', error);
      }
      setSelectedClient(null);
      setIsOpenDeleteClientModal(!isOpenDeleteClientModal);
      void fetchClients();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNewClient(prevState => {
      if (!prevState) {
        return null;
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleCompanyChange = (company: ListItem) => {
    setSelectedCompany(company);
    setNewClient(prevState => {
      if (!prevState) {
        return null;
      } else {
        return {
          ...prevState,
          company: {
            id: company.id,
            _id: company._id,
            name: company.name ?? '',
            shortName: company.shortName ?? '',
            logo: company.logo ?? '',
          },
        };
      }
    });
  };

  return (
    <>
      <Card title={t('clients')}>
        <>
          <div className="flex justify-end mb-2 mr-2">
            <PrimaryButton
              onClick={() => setIsOpenAddClientModal(!isOpenAddClientModal)}
            >
              {t('addClient')}
            </PrimaryButton>
          </div>
          <UITable
            columns={columns} // error en useSortableTable o UITable
            data={tableData}
            emptyState={<div>{t('err.noMatchingRecords')}</div>}
            filters={filters}
            keyExtractor={keyExtractor}
            onFilter={handleFilterChange}
            onSort={handleSorting}
            rowActions={rowActions}
          />
        </>
      </Card>
      <Modal
        // eslint-disable-next-line sonarjs/no-duplicate-string
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddClientModal}
        onCancel={handleCancelAddClient}
        onSubmit={handleSubmitAddClient}
        submitText={t('btn.create')}
        title={t('addClient')}
      >
        <>
          <SelectDropdown
            items={companies}
            onChange={handleCompanyChange}
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
            value={newClient?.firstname ?? ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
            type="text"
            value={newClient?.lastname ?? ''}
          />
          <SimpleInput
            id="email"
            label={t('email')}
            name="email"
            onChange={value => handleInputChange('email', value)}
            placeholder={t('email')}
            type="text"
            value={newClient?.email ?? ''}
          />
          <SimpleInput
            id="title"
            label={t('title')}
            name="title"
            onChange={value => handleInputChange('title', value)}
            placeholder={t('title')}
            type="text"
            value={newClient?.title ?? ''}
          />
          <SimpleInput
            id="phone"
            label={t('phone')}
            name="phone"
            onChange={value => handleInputChange('phone', value)}
            placeholder={t('phone')}
            type="text"
            value={newClient?.phone ?? ''}
          />
          <SimpleInput
            id="cell"
            label={t('cell')}
            name="cell"
            onChange={value => handleInputChange('cell', value)}
            placeholder={t('cell')}
            type="text"
            value={newClient?.cell ?? ''}
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenEditClientModal}
        onCancel={handleCancelEditClient}
        onSubmit={handleSubmitEditClient}
        submitText={t('btn.update')}
        title={t('editClient')}
      >
        <>
          <SelectDropdown
            items={companies}
            onChange={handleCompanyChange}
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
            value={newClient?.firstname ?? ''}
          />
          <SimpleInput
            id="lastname"
            label={t('lastname')}
            name="lastname"
            onChange={value => handleInputChange('lastname', value)}
            placeholder={t('lastname')}
            type="text"
            value={newClient?.lastname ?? ''}
          />
          <SimpleInput
            id="email"
            label={t('email')}
            name="email"
            onChange={value => handleInputChange('email', value)}
            placeholder={t('email')}
            type="text"
            value={newClient?.email ?? ''}
          />
          <SimpleInput
            id="title"
            label={t('title')}
            name="title"
            onChange={value => handleInputChange('title', value)}
            placeholder={t('title')}
            type="text"
            value={newClient?.title ?? ''}
          />
          <SimpleInput
            id="phone"
            label={t('phone')}
            name="phone"
            onChange={value => handleInputChange('phone', value)}
            placeholder={t('phone')}
            type="text"
            value={newClient?.phone ?? ''}
          />
          <SimpleInput
            id="cell"
            label={t('cell')}
            name="cell"
            onChange={value => handleInputChange('cell', value)}
            placeholder={t('cell')}
            type="text"
            value={newClient?.cell ?? ''}
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenDeleteClientModal}
        onCancel={handleCancelDeleteClient}
        onSubmit={handleSubmitDeleteClient}
        submitText={t('btn.confirm')}
        title={t('msg.confirmSuppression')}
      >
        <p>
          {t('client') +
            ` <<${selectedClient?.firstname} ` +
            `${selectedClient?.lastname}>> ` +
            t('msg.deleteNotice') +
            '!'}
        </p>
      </Modal>
    </>
  );
};
