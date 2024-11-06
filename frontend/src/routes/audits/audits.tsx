import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import DefaultRadioGroup from '../../components/button/DefaultRadioGroup';
import PrimaryButton from '../../components/button/PrimaryButton';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import SimpleInput from '../../components/input/SimpleInput';
import Modal from '../../components/modal/Modal';
import PrimarySwitch from '../../components/switch/PrimarySwitch';
import type { Column } from '../../components/table/UITable';
import UITable from '../../components/table/UITable';
import { useSortableTable } from '../../hooks/useSortableTable';
import { useTableFiltering } from '../../hooks/useTableFiltering';
import type { Audit } from '../../services/audits';
import {
  createAudit,
  deleteAudit,
  fetchUsername,
  generateReport,
  getAudits,
  getLanguages,
  getTypes,
} from '../../services/audits';

type RowAction = {
  label: string;
  onClick: (item: TableData) => void;
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

const RadioOptions = [
  { id: '1', label: t('default'), value: '1' },
  { id: '2', label: t('multi'), value: '2' },
];

type TypeData = {
  name: string;
  templates: {
    template: string;
    locale: string;
  }[];
  sections: string[];
  hidden: string[];
  stage: string;
};

type LanguageData = {
  language: string;
  locale: string;
};

type TableData = {
  id: string;
  Name: string;
  AuditType: string;
  Language: string;
  Company: string;
  Participants: string;
  Date: string;
};

export const Audits = () => {
  const navigate = useNavigate();
  const [myAudits, setMyAudits] = useState(false);

  const [usersConnected, setUsersConnected] = useState(false);

  const [isOpenNewAuditModal, setIsOpenNewAuditModal] = useState(false);

  const [selectedValue, setSelectedValue] = useState('1');

  const [nameAudit, setNameAudit] = useState<string>('');

  const [auditType, setAuditType] = useState<ListItem[]>([]);
  const [currentAuditType, setCurrentAuditType] = useState<ListItem | null>(
    null,
  );
  const [loadingAuditType, setLoadingAuditType] = useState<boolean>(false);

  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem | null>(null);
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  const [isOpenModalDeleteAudit, setIsOpenModalDeleteAudit] = useState(false);
  const [itemDelete, setItemDelete] = useState<TableData>();

  const columns: Column[] = [
    { header: t('name'), accessor: 'Name', sortable: true, filterable: true },
    {
      header: t('auditType'),
      accessor: 'AuditType',
      sortable: true,
      filterable: true,
    },
    {
      header: t('language'),
      accessor: 'Language',
      sortable: true,
      filterable: true,
    },
    {
      header: t('company'),
      accessor: 'Company',
      sortable: true,
      filterable: true,
    },
    {
      header: t('participants'),
      accessor: 'Participants',
      sortable: true,
      filterable: true,
    },
    { header: t('date'), accessor: 'Date', sortable: true, filterable: true },
  ];
  const [filteredData, setFilteredData] = useState<TableData[]>([]);

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    filteredData,
    columns,
  );

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    filteredData,
    columns,
    setTableData,
  );

  const fetchAndUpdateData = useCallback(async () => {
    const dataAudits = await getAudits().then(res => {
      return res.datas.map((audit: Audit) => ({
        id: audit._id,
        Name: audit.name,
        AuditType: audit.auditType,
        Language: audit.language,
        Company: audit.company?.name ?? '',
        Participants: audit.collaborators.map(user => user.username).join(', '),
        Date: new Date(audit.createdAt).toLocaleString(),
      }));
    });
    setTableData(dataAudits);
    setFilteredData(dataAudits);
  }, [setTableData, setFilteredData]);

  const confirmDeleteAudit = async () => {
    try {
      const response = await deleteAudit(itemDelete?.id ?? '');
      if (response.status === 'success') {
        toast.success(t('msg.auditDeletedOk'));
        void fetchAndUpdateData();
      }
    } catch (error) {
      toast.error(t('err.failedDeleteAudit'));
      console.error('Error:', error);
    }
    setIsOpenModalDeleteAudit(false);
  };

  const deleteRegisterConfirmation = (item: TableData) => {
    setItemDelete(item);
    setIsOpenModalDeleteAudit(true);
  };

  const rowActions: RowAction[] = [
    {
      label: 'Edit',
      onClick: (item: TableData) => navigate(`/audits/${item.id}/general`),
    },
    {
      label: 'Download',
      onClick: (item: TableData) => generateReport(item.id, window),
    },
    {
      label: 'Delete',
      onClick: (item: TableData) => deleteRegisterConfirmation(item),
    },
  ];

  useEffect(() => {
    fetchUsername()
      .then(username => {
        handleFilterChange(
          'Participants',
          myAudits ? username.datas.username : '',
        );
      })
      .catch(console.error);
    // Desactivado porque realmente no se debe gatillar el efecto cada vez que cambia handleFilterChange a través del useTableFiltering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAudits]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLanguage = await getLanguages();
        const languageNames = dataLanguage.datas.map(
          (item: LanguageData, index: number) => ({
            id: index,
            value: item.locale,
            label: item.language,
          }),
        );
        setLanguages(languageNames);
        setCurrentLanguage(languageNames[0]);
        setLoadingLanguage(false);

        const dataType = await getTypes();
        const typeNames = dataType.datas.map(
          (item: TypeData, index: number): ListItem => ({
            id: index,
            value: item.name,
          }),
        );
        setAuditType(typeNames);
        setLoadingAuditType(false);

        void fetchAndUpdateData();
      } catch (err) {
        setLoadingLanguage(false);
      }
    };
    fetchData().catch(console.error);
  }, [currentAuditType, fetchAndUpdateData]);

  const handleCancelNewAudit = () => {
    setCurrentAuditType(null);
    setCurrentLanguage(null);
    setSelectedValue('');
    setNameAudit('');
    setIsOpenNewAuditModal(!isOpenNewAuditModal);
  };

  const handleSubmitNewAudit = async () => {
    if (!currentAuditType || !currentLanguage) {
      return; // TODO: Show error
    }

    try {
      await createAudit({
        name: nameAudit,
        auditType: currentAuditType.value,
        language: currentLanguage.value,
        type: selectedValue,
      }).catch(error => {
        toast.error(error.message);
      });
      setCurrentAuditType(null);
      setCurrentLanguage(null);
      setSelectedValue('');
      setNameAudit('');
      void fetchAndUpdateData();
    } catch (error) {
      console.error('Error:', error);
    }
    setIsOpenNewAuditModal(!isOpenNewAuditModal);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
        <div className="flex items-center mb-4">
          <div className="ml-1">
            <span className="mx-1">{t('myAudits')}</span>
            <PrimarySwitch enabled={myAudits} onChange={setMyAudits} />
          </div>
          <div className="ml-1">
            <span className="mx-1">{t('usersConnected')}</span>
            <PrimarySwitch
              enabled={usersConnected}
              onChange={setUsersConnected}
            />
          </div>
          <div className="mt-2 mx-2 ml-auto">
            <PrimaryButton
              onClick={() => setIsOpenNewAuditModal(!isOpenNewAuditModal)}
            >
              {t('newAudit')}
            </PrimaryButton>
          </div>
        </div>
        <Modal
          cancelText={t('btn.cancel')}
          disablehr={true}
          isOpen={isOpenModalDeleteAudit}
          onCancel={() => setIsOpenModalDeleteAudit(false)}
          onSubmit={confirmDeleteAudit}
          submitText={t('btn.confirm')}
          title={t('msg.confirmSuppression')}
        >
          <span className="ml-3">{t('msg.auditDeleteNotice')}</span>
        </Modal>
        <Modal
          cancelText={t('btn.cancel')}
          isOpen={isOpenNewAuditModal}
          onCancel={handleCancelNewAudit}
          onSubmit={handleSubmitNewAudit}
          submitText={t('btn.create')}
          title={t('createAudit')}
        >
          <DefaultRadioGroup
            name="AuditType"
            onChange={setSelectedValue}
            options={RadioOptions}
            value={selectedValue}
          />
          <SimpleInput
            id="name"
            label={t('name')}
            name="name"
            onChange={setNameAudit}
            placeholder={t('name')}
            type="text"
            value={nameAudit}
          />
          {!loadingAuditType ? (
            <SelectDropdown
              items={auditType}
              onChange={setCurrentAuditType}
              selected={currentAuditType}
              title={t('auditType')}
            />
          ) : null}
          {!loadingLanguage ? (
            <SelectDropdown
              items={languages}
              onChange={setCurrentLanguage}
              selected={currentLanguage}
              title={t('language')}
            />
          ) : null}
        </Modal>

        <div className="flex justify-between items-center mb-4" />

        <UITable
          columns={columns}
          data={tableData}
          emptyState={t('err.noMatchingRecords')}
          filters={filters}
          keyExtractor={item => item.id}
          onFilter={handleFilterChange}
          onSort={handleSorting}
          rowActions={rowActions}
          sortable={true}
        />
      </div>
    </div>
  );
};
