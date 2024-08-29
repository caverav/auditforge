import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import PrimaryButton from '../../components/button/PrimaryButton';
import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';
import Modal from '../../components/modal/Modal';
import PrimarySwitch from '../../components/switch/PrimarySwitch';
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
import AddVulnerability from './addVulnerability';
import EditVulnerability from './editVulnerability';
import MergeVulnerabilities from './mergeVulnerabilities';

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

type TableData = {
  _id: string;
  title: string;
  category?: string;
  type?: string;
};

export const Vulnerabilities = () => {
  const [openModalDeleteVuln, setOpenModalDeleteVuln] = useState(false);

  // Core
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityData[]>(
    [],
  );
  const [tableInfo, setTableInfo] = useState<TableData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Lang
  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem | null>(null);
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  // Category
  const [categories, setCategories] = useState<ListItem[]>([]);

  // Types
  const [types, setTypes] = useState<ListItem[]>([]);

  // Sliding Pages
  const [openAddVuln, setOpenAddVuln] = useState(false);
  const openAddVulnSlidingPage = () => setOpenAddVuln(true);

  const [openEditVuln, setOpenEditVuln] = useState<boolean>(false);
  const [editVuln, setEditVuln] = useState<VulnerabilityData>();
  const [selectedCategory, setSelectedCategory] = useState<ListItem | null>(
    null,
  );

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

  const fetchVulnerabilities = async () => {
    try {
      const dataVulnerability = await getVulnerabilities();
      setVulnerabilities(dataVulnerability.datas);
      const vulnDataTable = dataVulnerability.datas.map(
        (item2: VulnerabilityData) => ({
          _id: item2._id,
          title: item2.details[0].title ?? '',
          category: item2.category ? item2.category : t('noCategory'),
          type: item2.details[0].vulnType
            ? item2.details[0].vulnType
            : t('undefined'),
        }),
      );
      setTableData(vulnDataTable);
      setTableInfo(vulnDataTable);
    } catch (err) {
      setError(true);
    }
  };

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
      setLanguages(languageNames);
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
      setTypes([...typeNames]);
    } catch (err) {
      setError(true);
    }
  };

  const fetchCategories = async () => {
    try {
      const dataCategory = await getCategories();
      const categoryNames = dataCategory.datas.map(
        (item: CategoryData, index: number) => ({
          id: index + 1,
          value: item.name,
          label: item.name,
        }),
      );
      setCategories([
        { id: 0, label: t('noCategory'), value: null },
        ...categoryNames,
      ]);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    void fetchVulnerabilities();
    void fetchLanguages();
    void fetchTypes();
    void fetchCategories();
  }, []);
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

    const vulnDataTable: TableData[] = filtered.map(item2 => ({
      _id: item2._id,
      title: item2.details[item2.matchingDetailIndex].title ?? 'noTitle',
      category: item2.category ? item2.category : t('noCategory'),
      type: item2.details[item2.matchingDetailIndex].vulnType
        ? item2.details[item2.matchingDetailIndex].vulnType
        : t('undefined'),
    }));
    setTableData(vulnDataTable);
    setTableInfo(vulnDataTable);
  }, [vulnerabilities, currentLanguage, setTableData]);

  const [openMerge, setOpenMerge] = useState(false);

  // Testing Table
  const [itemDelete, setItemDelete] = useState<TableData>();

  const editRegister = (item: TableData) => {
    const vuln = vulnerabilities.find(vuln => vuln._id === item._id);
    setEditVuln(vuln);
    setOpenEditVuln(true);
  };

  const deleteRegisterConfirmation = (item: TableData) => {
    setItemDelete(item);
    setOpenModalDeleteVuln(true);
  };

  const handleSuccessToast = (message: string) => {
    // Muestra el toast satisfactorio
    toast.success(message);
  };

  const confirmDeleteVulnerability = async () => {
    //Add try
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

  const keyExtractor = (item: TableData) => item._id;

  const rowActions = [
    {
      label: 'Edit',
      onClick: (item: TableData) => editRegister(item),
    },
    {
      label: 'Download',
      onClick: (item: TableData) => alert(`Find audits ${item.title}`),
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
    <div className="p-4">
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
            {openAddVuln ? (
              <AddVulnerability
                categoryVuln={selectedCategory}
                handleOnSuccess={handleSuccessToast}
                handlerIsOpen={setOpenAddVuln}
                isOpen={openAddVuln}
                languages={languages}
                refreshVulns={fetchVulnerabilities}
                types={types}
              />
            ) : null}
          </div>
          <div className="fixed z-10">
            {openEditVuln ? (
              <EditVulnerability
                categories={categories}
                currentVuln={editVuln!}
                handleOnSuccess={handleSuccessToast}
                handlerIsOpen={setOpenEditVuln}
                isOpen={openEditVuln}
                languages={languages}
                refreshVulns={fetchVulnerabilities}
                types={types}
              />
            ) : null}
          </div>
          <div className="fixed z-10">
            {openMerge ? (
              <MergeVulnerabilities
                handleOnSuccess={handleSuccessToast}
                handlerIsOpen={setOpenMerge}
                isOpen={openMerge}
                languages={languages}
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
                    items={languages}
                    onChange={setCurrentLanguage}
                    placeholder="Language"
                    selected={currentLanguage}
                    title={t('languages')}
                  />
                ) : null}
              </div>
              <div className="flex">
                <div className="mt-2 mx-2">
                  <PrimaryButton onClick={() => setOpenMerge(true)}>
                    <span className="mx-1">{t('mergeVulnerabilities')}</span>
                  </PrimaryButton>
                </div>
                <div className="flex mt-2 mx-2">
                  <PrimaryButton onClick={openAddVulnSlidingPage}>
                    <span className="mx-1">{t('newVulnerability')}</span>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </UITable>
        </>
      </Card>
    </div>
  );
};
