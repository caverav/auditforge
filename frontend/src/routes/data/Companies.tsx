import { useCallback, useEffect, useState } from 'react';
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

type TableData = {
  _id?: string;
  name: string;
  shortName: string;
  logo: string;
};

export const Companies: React.FC = () => {
  const { t } = useTranslation();

  const initialCompanyState = {
    name: '',
    shortName: '',
    logo: '',
  };

  const [newCompany, setNewCompany] = useState<NewCompany | null>(
    initialCompanyState,
  );

  const [companies, setCompanies] = useState<NewCompany[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<string | null>(null);

  const [addModalNameRequiredAlert, setAddModalNameRequiredAlert] =
    useState<boolean>(false);

  const [editModalNameRequiredAlert, setEditModalNameRequiredAlert] =
    useState<boolean>(false);

  const [selectedCompany, setSelectedCompany] = useState<TableData | null>(
    null,
  );

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
          <span />
        ),
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

  const fetchCompanies = useCallback(async () => {
    try {
      const data = await getCompanies();
      setCompanies(data.datas);
      setTableData(data.datas);
      setLoading(false);
    } catch (err) {
      setError('Error fetching company');
      setLoading(false);
    }
  }, [setTableData]);

  useEffect(() => {
    void fetchCompanies();
  }, [fetchCompanies]);

  const keyExtractor = (item: TableData) => item._id ?? '';

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

  const handleCancelAddCompanies = () => {
    setNewCompany(initialCompanyState);
    setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal);

    setAddModalNameRequiredAlert(false);
  };

  const handleSubmitAddCompanies = async () => {
    let isValid = true;

    if (!newCompany?.name || newCompany.name.trim() === '') {
      setAddModalNameRequiredAlert(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error(t('msg.fieldRequired'));
      return;
    }

    try {
      if (!newCompany) {
        return null;
      } else {
        await createCompany(newCompany);
        toast.success(t('msg.companyCreatedOk'));
        setIsOpenAddCompaniesModal(!isOpenAddCompaniesModal);

        setNewCompany(initialCompanyState);
        void fetchCompanies();
      }
    } catch (error) {
      toast.error(t('msg.companyNameError'));
      setError('Error creating company');
      console.error('Error:', error);
    }
  };

  const handleCancelEditCompanies = () => {
    setNewCompany(initialCompanyState);
    setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);

    setEditModalNameRequiredAlert(false);
  };

  const handleSubmitEditCompanies = async () => {
    let isValid = true;

    if (!newCompany?.name || newCompany.name.trim() === '') {
      setEditModalNameRequiredAlert(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error(t('msg.fieldRequired'));
      return;
    }

    try {
      if (!newCompany) {
        return null;
      } else {
        await updateCompany(newCompany);
        toast.success(t('msg.companyUpdatedOk'));
        setIsOpenEditCompaniesModal(!isOpenEditCompaniesModal);

        setNewCompany(initialCompanyState);
        void fetchCompanies();
      }
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
      void fetchCompanies();
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setNewCompany(prevState => {
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

  const handleImageSelect = (base64String: string) => {
    setNewCompany(prevState => {
      if (!prevState) {
        return null;
      } else {
        return {
          ...prevState,
          logo: base64String,
        };
      }
    });
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
        // eslint-disable-next-line sonarjs/no-duplicate-string
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
            requiredAlert={addModalNameRequiredAlert}
            requiredField
            type="text"
            value={newCompany?.name ?? ''}
          />
          <SimpleInput
            id="shortname"
            label={t('shortName')}
            name="shortname"
            onChange={value => handleInputChange('shortName', value)}
            placeholder={t('shortName')}
            type="text"
            value={newCompany?.shortName ?? ''}
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
            requiredAlert={editModalNameRequiredAlert}
            requiredField
            type="text"
            value={newCompany?.name ?? ''}
          />
          <SimpleInput
            id="shortname"
            label={t('shortName')}
            name="shortname"
            onChange={value => handleInputChange('shortName', value)}
            placeholder={t('shortName')}
            type="text"
            value={newCompany?.shortName ?? ''}
          />
          <ImageInput
            id="logo"
            initialImage={newCompany?.logo ?? ''}
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
