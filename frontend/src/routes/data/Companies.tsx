import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import ImageInput from '../../components/input/ImageInput';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import UITable from '../../components/table/UITable';
import { useSortableTable } from '../../hooks/useSortableTable';
import { useTableFiltering } from '../../hooks/useTableFiltering';
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from '../../services/data';

type NewCompany = {
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
};

export const Companies: React.FC = () => {
  const { t } = useTranslation();

  const [newCompany, setNewCompany] = useState<NewCompany | null>({
    name: '',
    shortName: '',
    logo: '',
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);

  const [addModalNameRequiredAlert, setAddModalNameRequiredAlert] =
    useState<boolean>(false);

  const [selectedCompany, setSelectedCompany] = useState<TableData | null>(
    null,
  );

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError('Error fetching company');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const columns = [
    { header: t('name'), accessor: 'name', sortable: true, filterable: true },
    { header: t('shortName'), accessor: 'shortName', sortable: true },
    {
      header: t('logo'),
      accessor: 'logo',
      sortable: false,
      render: (logo: string) =>
        logo ? (
          <img
            alt="Company Logo"
            src={`${logo}`}
            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
          />
        ) : (
          <></>
        ),
    },
  ];

  type TableData = {
    _id: string;
    name: string;
    shortName: string;
    logo: string;
  };

  const keyExtractor = (item: any) => item._id;

  const handleEditCompanyButton = (company: TableData) => {
    setNewCompany({
      _id: company._id,
      name: company.name,
      shortName: company.shortName,
      logo: company.logo,
    });
    setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);
  };

  const handleDeleteCompanyButton = (company: TableData) => {
    setSelectedCompany(company);
    setIsOpenDeleteCompanyModal(!isOpenDeleteCompanyModal);
  };

  const rowActions = [
    {
      label: 'Edit',
      onClick: (item: TableData) => handleEditCompanyButton(item),
    },
    {
      label: 'Delete',
      onClick: (item: TableData) => handleDeleteCompanyButton(item),
    },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    companies,
    columns,
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    companies,
    columns,
    setTableData,
  );

  const [isOpenAddCompaniesModal, setIsOpenAddCompaniesModal] = useState(false);
  const [isOpenEditCompaniesModal, setIsOpenEditCompaniesModal] =
    useState(false);
  const [isOpenDeleteCompanyModal, setIsOpenDeleteCompanyModal] =
    useState(false);

  const handleCancelAddCompanies = () => {
    setNewCompany(null);
    setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal);
    setAddModalNameRequiredAlert(false);
  };

  const handleSubmitAddCompanies = async () => {
    let isValid = true;

    if (!newCompany?.name) {
      setAddModalNameRequiredAlert(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error(t('msg.fieldRequired'));
      return;
    }
    try {
      await createCompany(newCompany!);
      toast.success(t('msg.companyCreatedOk'));
      setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal);

      setNewCompany(null);
      fetchCompanies();
    } catch (error) {
      toast.error(t('msg.companyNameError'));
      setError('Error creating company');
      console.error('Error:', error);
    }
  };

  const handleCancelEditCompanies = () => {
    setNewCompany(null);
    setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);
  };

  const handleSubmitEditCompanies = async () => {
    try {
      await updateCompany(newCompany!);
      toast.success(t('msg.companyUpdatedOk'));
      setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);

      setNewCompany(null);
      fetchCompanies();
    } catch (error) {
      toast.error(t('msg.companyNameError'));
      setError('Error updating company');
      console.error('Error:', error);
    }
  };

  const handleCancelDeleteCompany = () => {
    setIsOpenDeleteCompanyModal(!isOpenDeleteCompanyModal);
  };

  const handleSubmitDeleteCompany = async () => {
    if (selectedCompany?._id) {
      try {
        await deleteCompany(selectedCompany._id);
        toast.success(t('msg.companyDeletedOk'));
      } catch (error) {
        setError('Error deleting company');
        console.error('Error:', error);
      }
      setSelectedCompany(null);
      setIsOpenDeleteCompanyModal(!isOpenDeleteCompanyModal);
      fetchCompanies();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCompany(prevState => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleImageSelect = (base64String: string) => {
    setNewCompany(prevState => ({
      ...prevState!,
      logo: base64String,
    }));
  };

  return (
    <>
      <Card title={t('companies')}>
        <>
          <div className="flex justify-end mb-2 mr-2">
            <PrimaryButton
              onClick={() =>
                setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal)
              }
            >
              {t('addCompany')}
            </PrimaryButton>
          </div>
          <UITable
            columns={columns}
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
        cancelText={t('btn.cancel')}
        isOpen={isOpenAddCompaniesModal}
        onCancel={handleCancelAddCompanies}
        onSubmit={handleSubmitAddCompanies}
        submitText={t('btn.create')}
        title={t('addCompany')}
      >
        <>
          <SimpleInput
            id="name"
            label={t('name')}
            name="name"
            onChange={value => handleInputChange('name', value)}
            placeholder={t('name')}
            type="text"
            value={newCompany?.name || ''}
            requiredField={true}
            requiredAlert={addModalNameRequiredAlert}
          />
          <SimpleInput
            id="shortname"
            label={t('shortName')}
            name="shortname"
            onChange={value => handleInputChange('shortName', value)}
            placeholder={t('shortName')}
            type="text"
            value={newCompany?.shortName || ''}
          />
          <ImageInput
            id="logo"
            label={t('logo')}
            name="logo"
            onImageSelect={handleImageSelect}
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenEditCompaniesModal}
        onCancel={handleCancelEditCompanies}
        onSubmit={handleSubmitEditCompanies}
        submitText={t('btn.update')}
        title={t('editCompany')}
      >
        <>
          <SimpleInput
            id="name"
            label={t('name')}
            name="name"
            onChange={value => handleInputChange('name', value)}
            placeholder={t('name')}
            type="text"
            value={newCompany?.name || ''}
            requiredField={true}
          />
          <SimpleInput
            id="shortname"
            label={t('shortName')}
            name="shortname"
            onChange={value => handleInputChange('shortName', value)}
            placeholder={t('shortName')}
            type="text"
            value={newCompany?.shortName || ''}
          />
          <ImageInput
            id="logo"
            initialImage={newCompany?.logo || ''}
            label={t('logo')}
            name="logo"
            onImageSelect={handleImageSelect}
          />
        </>
      </Modal>
      <Modal
        cancelText={t('btn.cancel')}
        isOpen={isOpenDeleteCompanyModal}
        onCancel={handleCancelDeleteCompany}
        onSubmit={handleSubmitDeleteCompany}
        submitText={t('btn.confirm')}
        title={t('msg.confirmSuppression')}
      >
        <p>
          {t('company') +
            ` <<${selectedCompany?.name}>> ` +
            t('msg.deleteNotice') +
            '!'}
        </p>
      </Modal>
    </>
  );
};
