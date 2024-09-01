import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import Modal from '../../components/modal/Modal';
import UITable from '../../components/table/UITable';
import { useSortableTable } from '../../hooks/useSortableTable';
import { useTableFiltering } from '../../hooks/useTableFiltering';
import {
  deleteVulnerability,
  getCategories,
  getLanguages,
  getTypes,
  getVulnerabilities,
} from '../../services/vulnerabilities';
import AddVulnerability from './add/addVulnerability';
import VulnerabilityButtons from './components/vulnerabilityButtons';
import EditVulnerability from './edit/editVulnerability';
import MergeVulnerabilities from './merge/mergeVulnerabilities';

type Details = {
  locale: string;
  title?: string;
  vulnType?: string;
  description?: string;
  observation?: string;
  remediation?: string;
  cwes: string[];
  references: string[];
  customFields: string[];
};

type VulnerabilityData = {
  _id: string;
  cvssv3: string | null;
  priority?: number | '';
  remediationComplexity?: number | '';
  details: Details[];
  status?: number;
  category?: string | null;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
};

type LanguageData = {
  language: string;
  locale: string;
};

type CategoryData = {
  _id: string;
  name: string;
  sortValue: string;
  sortOrder: string;
  sortAuto: boolean;
};

type TypeData = {
  name: string;
  locale: string;
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type ListItemCategory = {
  id: number;
  value: string;
  label?: string;
  isNull?: boolean;
  hrEnabled?: boolean;
  onClick: (item: ListItem) => void;
};

type TableData = {
  _id: string;
  title: string;
  category?: string;
  type?: string;
};

export const Vulnerabilities = () => {
  const navigate = useNavigate();

  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityData[]>(
    [],
  );
  const [tableInfo, setTableInfo] = useState<TableData[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const [languagesList, setLanguagesList] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem | null>(null);
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  const [categoriesList, setCategoriesList] = useState<ListItemCategory[]>([]);
  const [typesList, setTypesList] = useState<ListItem[]>([]);

  const [isOpenAddVuln, setIsOpenAddVuln] = useState(false);
  const openAddVulnSlidingPage = () => setIsOpenAddVuln(true);

  const [isOpenEditVuln, setIsOpenEditVuln] = useState<boolean>(false);
  const [editVuln, setEditVuln] = useState<VulnerabilityData>();
  const [selectedCategoryAddVuln, setSelectedCategoryAddVuln] =
    useState<ListItem | null>(null);

  const handleSuccessToast = (message: string) => {
    toast.success(message);
  };

  const [openModalDeleteVuln, setOpenModalDeleteVuln] = useState(false);

  const columns = [
    { header: t('title'), accessor: 'title', sortable: true, filterable: true },
    {
      header: t('category'),
      accessor: 'category',
      sortable: true,
      filterable: true,
    },
    { header: t('type'), accessor: 'type', sortable: true, filterable: true },
  ];

  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    tableInfo,
    columns,
  );

  const fetchVulnerabilities = useCallback(async () => {
    try {
      const dataVulnerability = await getVulnerabilities();
      setVulnerabilities(dataVulnerability.datas);
      const vulnDataTable = dataVulnerability.datas.map(
        (item: VulnerabilityData) => ({
          _id: item._id,
          title: item.details[0].title ?? '',
          category: item.category ?? t('noCategory'),
          type: item.details[0].vulnType
            ? item.details[0].vulnType
            : t('undefined'),
        }),
      );
      setTableData(vulnDataTable);
      setTableInfo(vulnDataTable);
    } catch (err) {
      setError(true);
    }
  }, [setTableData]);

  const fetchLanguages = async () => {
    try {
      const dataLanguage = await getLanguages();
      const languageNames = dataLanguage.datas.map(
        (item: LanguageData, index: number) => ({
          id: index,
          value: item.locale,
          label: item.language,
        }),
      );
      setLanguagesList(languageNames);
      setCurrentLanguage(languageNames[0]);
      setLoadingLanguage(false);
    } catch (err) {
      setError(true);
    }
  };

  const fetchTypes = async () => {
    try {
      const dataType = await getTypes();
      const typeNames = dataType.datas.map((item: TypeData, index: number) => ({
        id: index + 1,
        value: item.name,
        label: item.name,
        locale: item.locale,
      }));
      setTypesList([...typeNames]);
    } catch (err) {
      setError(true);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const dataCategory = await getCategories();
      const categoryNames = dataCategory.datas.map(
        (item: CategoryData, index: number) => ({
          id: index + 1,
          value: item.name,
          label: item.name,
          onClick: (item2: ListItem) => {
            setSelectedCategoryAddVuln(item2);
            openAddVulnSlidingPage();
          },
        }),
      );
      setCategoriesList([
        {
          id: 0,
          label: t('noCategory'),
          value: '',
          isNull: true,
          hrEnabled: true,
          onClick: (item2: ListItem) => {
            setSelectedCategoryAddVuln(item2);
            openAddVulnSlidingPage();
          },
        },
        ...categoryNames,
      ]);
    } catch (err) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    void fetchVulnerabilities();
    void fetchLanguages();
    void fetchTypes();
    void fetchCategories();
  }, [fetchCategories, fetchVulnerabilities]);
  //

  //// Workaround para dropdown de filtrado, al parecer funciona bien btw
  useEffect(() => {
    const filtered = vulnerabilities
      .filter(vulnIter =>
        vulnIter.details.some(
          detail => detail.locale === currentLanguage?.value,
        ),
      )
      .map(vulnIter => {
        const index = vulnIter.details.findIndex(
          detail => detail.locale === currentLanguage?.value,
        );
        return { ...vulnIter, matchingDetailIndex: index };
      });

    const vulnDataTable: TableData[] = filtered.map(item => ({
      _id: item._id,
      title: item.details[item.matchingDetailIndex].title ?? 'noTitle',
      category: item.category ?? t('noCategory'),
      type: item.details[item.matchingDetailIndex].vulnType ?? t('undefined'),
    }));
    setTableData(vulnDataTable);
    setTableInfo(vulnDataTable);
  }, [vulnerabilities, currentLanguage, setTableData]);

  const [isOpenMerge, setIsOpenMerge] = useState(false);
  const [itemDelete, setItemDelete] = useState<TableData>();

  const confirmDeleteVulnerability = async () => {
    try {
      const response = await deleteVulnerability(itemDelete!._id);
      if (response) {
        handleSuccessToast(t('msg.vulnerabilityDeletedOk'));
      }
    } catch (error) {
      setErrorText('Error creating vulnerability');
      console.error('Error:', error);
    }
    setOpenModalDeleteVuln(false);
    void fetchVulnerabilities();
  };

  const deleteRegisterConfirmation = (item: TableData) => {
    setItemDelete(item);
    setOpenModalDeleteVuln(true);
  };

  const editRegister = (item: TableData) => {
    const vuln = vulnerabilities.find(vuln => vuln._id === item._id);
    setEditVuln(vuln);
    setIsOpenEditVuln(true);
  };

  const findRegister = (item: TableData) => {
    const sanitizedQueryParam = encodeURIComponent(item.title.trim());
    navigate(`/audits?findingTitle=${sanitizedQueryParam}`);
  };

  const keyExtractor = (item: TableData) => item._id;

  const rowActions = [
    {
      label: 'Edit',
      onClick: (item: TableData) => editRegister(item),
    },
    {
      label: 'FindAudit',
      onClick: (item: TableData) => findRegister(item),
    },
    {
      label: 'Delete',
      onClick: (item: TableData) => deleteRegisterConfirmation(item),
    },
  ];

  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    tableInfo,
    columns,
    setTableData,
  );

  return (
    <div className="max-w-screen-2xl mx-auto my-6">
      {openModalDeleteVuln ? (
        <div className="fixed z-10">
          <Modal
            cancelText={t('btn.stay')}
            disablehr={true}
            isOpen={openModalDeleteVuln}
            onCancel={() => setOpenModalDeleteVuln(false)}
            onSubmit={confirmDeleteVulnerability}
            submitText={t('btn.confirm')}
            title={t('msg.confirmSuppression')}
          >
            <span className="ml-3">{t('msg.vulnerabilityWillBeDeleted')}</span>
          </Modal>
        </div>
      ) : null}
      <Toaster />
      <Card title={t('nav.vulnerabilities')}>
        <>
          <div className="fixed z-10">
            {isOpenAddVuln ? (
              <AddVulnerability
                categoryVuln={selectedCategoryAddVuln}
                handleOnSuccess={handleSuccessToast}
                handlerIsOpen={setIsOpenAddVuln}
                isOpen={isOpenAddVuln}
                languages={languagesList}
                refreshVulns={fetchVulnerabilities}
                types={typesList}
              />
            ) : null}
          </div>
          <div className="fixed z-10">
            {isOpenEditVuln ? (
              <EditVulnerability
                categories={categoriesList}
                currentVuln={editVuln!}
                handleOnSuccess={handleSuccessToast}
                handlerIsOpen={setIsOpenEditVuln}
                isOpen={isOpenEditVuln}
                languages={languagesList}
                refreshVulns={fetchVulnerabilities}
                types={typesList}
              />
            ) : null}
          </div>
          <div className="fixed z-10">
            {isOpenMerge ? (
              <MergeVulnerabilities
                handleOnSuccess={handleSuccessToast}
                handlerIsOpen={setIsOpenMerge}
                isOpen={isOpenMerge}
                languages={languagesList}
                refreshVulns={fetchVulnerabilities}
                vulnerabilities={vulnerabilities}
              />
            ) : null}
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
          >
            <div className="flex items-center mb-4">
              <div className="">
                {!loadingLanguage ? (
                  <SelectDropdown
                    items={languagesList}
                    onChange={setCurrentLanguage}
                    placeholder="Language"
                    selected={currentLanguage}
                    title={t('languages')}
                  />
                ) : null}
              </div>
              <VulnerabilityButtons
                categoriesList={categoriesList}
                setOpenMerge={setIsOpenMerge}
              />
            </div>
          </UITable>
        </>
      </Card>
    </div>
  );
};
