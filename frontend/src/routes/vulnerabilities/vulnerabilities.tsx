import PrimarySwitch from "../../components/switch/PrimarySwitch"
import PrimaryButton from "../../components/button/PrimaryButton"
import { useState, useEffect } from "react";
import { getLanguages, getCategories, getTypes, getVulnerabilities, deleteVulnerability} from "../../services/vulnerabilities";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { t } from "i18next"
import AddVulnerability from "./addVulnerability";
import EditVulnerability from "./editVulnerability";
import UITable from "../../components/table/UITable";
import { useSortableTable } from "../../hooks/useSortableTable";
import { useTableFiltering } from "../../hooks/useTableFiltering";
import Card from "../../components/card/Card";
import Modal from "../../components/modal/Modal";
import MergeVulnerabilities from "./mergeVulnerabilities";
import { Toaster, toast } from "sonner";


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
} 

type VulnerabilityData = {
  _id: string;
  cvssv3: string | null;
  priority?: number | "";
  remediationComplexity?: number | "";
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

interface ListItem {
  id: number;
  value: string;
  label?: string;
  locale?: string;
}

type TableData = {
  _id: string;
  title: string;
  category?: number;
  type?: string;
};

export const Vulnerabilities = () => {
  // Switches
  const [enabledValid, setEnabledValid] = useState(false)
  const [enabledNew, setEnabledNew] = useState(false)
  const [enabledUpdate, setEnabledUpdate] = useState(false)
  const [openModalDeleteVuln, setOpenModalDeleteVuln] = useState(false)

  // Core
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);


  // Lang
  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem|null>(null);
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  // Category
  const [categories, setCategories] = useState<ListItem[]>([]);

  // Types
  const [types, setTypes] = useState<ListItem[]>([]);
  
  // Sliding Pages
  const [openAddVuln, setOpenAddVuln] = useState(false);
  const openAddVulnSlidingPage = () => setOpenAddVuln(true);

  const [openEditVuln, setOpenEditVuln] = useState<boolean>(false)
  const [editVuln, setEditVuln] = useState<VulnerabilityData>()
  const [selectedCategory, setSelectedCategory] = useState<ListItem|null>(null);



  const fetchVulnerabilities = async () => {
    try {
      const dataVulnerability = await getVulnerabilities();
      setVulnerabilities(dataVulnerability.datas);
      const vulnDataTable =  dataVulnerability.datas.map((item2: VulnerabilityData) =>({
        _id: item2._id,
        title: item2.details[0].title,
        category: item2.category ? item2.category: t('noCategory'),
        type: item2.details[0].vulnType ? item2.details[0].vulnType : t('undefined'),
      }))
      setTableData(vulnDataTable)
      setTableInfo(vulnDataTable)
    } catch (err) {
      setError(true);
    }
  }

  const fetchLanguages = async () => {
    try {
      const dataLanguage = await getLanguages();
      const languageNames = dataLanguage.datas.map((item: LanguageData, index: number) => ({
        id: index,
        value: item.locale,
        label: item.language
      }));
      setLanguages(languageNames);
      setCurrentLanguage(languageNames[0]);
      setLoadingLanguage(false);
    } catch (err) {
      setError(true);
    }
  }

  const fetchTypes = async () => {
    try {
      const dataType = await getTypes();
      const typeNames = dataType.datas.map((item: TypeData, index: number) => ({
        id: index + 1,
        value: item.name,
        label: item.name,
        locale: item.locale
      }));
      setTypes([...typeNames])
    } catch (err) {
      setError(true);
    }
  }

  const fetchCategories = async () => {
    try {
      const dataCategory = await getCategories();
      const categoryNames = dataCategory.datas.map((item: CategoryData, index: number) => ({
        id: index + 1,
        value: item.name,
        label: item.name
      }));
      setCategories([{id: 0, label: t('noCategory'), value: null},...categoryNames]);
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchVulnerabilities();
    fetchLanguages();
    fetchTypes();
    fetchCategories();
  }, []);  
  //

  //// Workaround para dropdown de filtrado
  useEffect(() => {
    const filtered = vulnerabilities.filter(vulnIter => vulnIter.details[0].locale === currentLanguage?.value)
    const vulnDataTable =  filtered.map((item2) =>({
      _id: item2._id,
      title: item2.details[0].title ? item2.details[0].title : "noTitle",
      category: item2.category ? item2.category: t('noCategory'),
      type: item2.details[0].vulnType ? item2.details[0].vulnType : t('undefined'),
    }))
    setTableData(vulnDataTable)
    setTableInfo(vulnDataTable)
  }, [vulnerabilities, currentLanguage]);  
  ////

  const [openMerge, setOpenMerge] = useState(false)


  // Testing Table
  const [itemDelete, setItemDelete] = useState<any>()

  const columns = [
    { header: t('title'), accessor: "title", sortable: true, filterable: true },
    { header: t('category'), accessor: "category", sortable: true, filterable:true },
    { header: t('type'), accessor: "type", sortable: true, filterable:true },
  ];

  
  const editRegister = (item: any) => {
    const vuln = vulnerabilities.find((vuln) => vuln._id === item._id)
    setEditVuln(vuln)
    setOpenEditVuln(true)
  }

  const deleteRegisterConfirmation = (item: any) => {
    setItemDelete(item)
    setOpenModalDeleteVuln(true)
  }

  const confirmDeleteVulnerability = async () => {
    //Add try
    try {
      const response = await deleteVulnerability(itemDelete._id)
      if (response) handleSuccessToast(t('msg.vulnerabilityDeletedOk'));
    } catch (error) {
      setErrorText("Error creating vulnerability");
      console.error("Error:", error);
    }
    setOpenModalDeleteVuln(false);
    fetchVulnerabilities()
  }

  const handleSuccessToast = (message: string) => {
    // Muestra el toast satisfactorio
    toast.success(message);
  };



  const keyExtractor = (item: any) => item._id;

  const rowActions = [
    {
      label: "Edit",
      onClick: (item: any) => editRegister(item),
    },
    {
      label: "Download",
      onClick: (item: any) => alert(`Find audits ${item.title}`),
    },
    {
      label: "Delete",
      onClick: (item: any) => deleteRegisterConfirmation(item),
    },
  ];
  
  const [tableData, handleSorting, setTableData] = useSortableTable<TableData>(
    tableInfo,
    columns
  );

 
  const [filters, handleFilterChange] = useTableFiltering<TableData>(
    tableInfo,
    columns,
    setTableData
  );
  
  return (
    <div className="p-4">
      {openModalDeleteVuln && 
        <div className="fixed z-10">
          <Modal 
            title={t('msg.confirmSuppression')}
            onCancel={() => setOpenModalDeleteVuln(false)}
            onSubmit={confirmDeleteVulnerability}
            cancelText={t('btn.stay')}
            submitText={t('btn.confirm')}
            isOpen={openModalDeleteVuln}
            disablehr={true}
          >
            <span className="ml-3">{t('msg.vulnerabilityWillBeDeleted')}</span>
          </Modal>
        </div>
      }
      <Toaster />
      <Card title={t("nav.vulnerabilities")}>
        <>
          <div className="fixed z-10">
            {openAddVuln && <AddVulnerability isOpen={openAddVuln} handlerIsOpen={setOpenAddVuln} categoryVuln={selectedCategory} languages={languages} types={types} refreshVulns={fetchVulnerabilities} handleOnSuccess={handleSuccessToast}/>}
          </div>
          <div className="fixed z-10">
            {openEditVuln && <EditVulnerability isOpen={openEditVuln} handlerIsOpen={setOpenEditVuln} categories={categories} languages={languages} types={types} refreshVulns={fetchVulnerabilities} currentVuln={editVuln!} handleOnSuccess={handleSuccessToast}/>}          
          </div>
          <div className="fixed z-10">
            {openMerge && <MergeVulnerabilities isOpen={openMerge} handlerIsOpen={setOpenMerge} vulnerabilities={vulnerabilities} languages={languages} refreshVulns={fetchVulnerabilities} handleOnSuccess={handleSuccessToast}/>}          
          </div>
          <UITable
            columns={columns}
            data={tableData}
            keyExtractor={keyExtractor}
            onSort={handleSorting}
            filters={filters}
            onFilter={handleFilterChange}
            rowActions={rowActions}
            emptyState={<div>{t("err.noMatchingRecords")}</div>}
          >
          <div className="flex items-center mb-4">
            <div className="">
              {!loadingLanguage && <SelectDropdown 
                title={t('languages')} 
                items={languages}
                selected={currentLanguage}
                onChange={setCurrentLanguage}
                placeholder="Language"
              />}
            </div>
            <div className="ml-1">
              <PrimarySwitch enabled={enabledValid} onChange={setEnabledValid} label={t('btn.valid')}/>
            </div>
           <div className="ml-1"> 
              <PrimarySwitch enabled={enabledNew} onChange={setEnabledNew} label={t('btn.new')}/>
            </div>
            <div className="ml-1 mr-6">
              <PrimarySwitch enabled={enabledUpdate} onChange={setEnabledUpdate} label={t('btn.updates')}/>
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
