import PrimarySwitch from "../../components/switch/PrimarySwitch"
import PrimaryButton from "../../components/button/PrimaryButton"
import { useState, useEffect } from "react";
import { getLanguages, getCategories, getTypes, getVulnerabilities, deleteVulnerability} from "../../services/vulnerabilities";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { t } from "i18next"
import AddVulnerability from "./addVulnerability";
import EditVulnerability from "./editVulnerability";

//// Testing Table
import UITable from "../../components/table/UITable";
import { useSortableTable } from "../../hooks/useSortableTable";
import { useTableFiltering } from "../../hooks/useTableFiltering";
import Card from "../../components/card/Card";
////


type Details = {
  locale?: string;
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
  cvssv3?: string;
  priority?: number | "";
  remediationComplexity?: number | "";
  details: Details[];
  status?: number;
  category: string | null; 
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
}

type AddVulnerabilityData = {
  cvssv3: string;
  priority: number;
  remediationComplexity: string;
  details: Details[];
  category: string; 
};

type TableData = {
  _id: string;
  title: string;
  category?: number;
  type?: string;
};

export const Vulnerabilities = () => {
  const [enabledValid, setEnabledValid] = useState(false)
  const [enabledNew, setEnabledNew] = useState(false)
  const [enabledUpdate, setEnabledUpdate] = useState(false)

  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);

  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem>({id: 0, value: ''});
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  const [categories, setCategories] = useState<ListItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ListItem>({id: 0, value: t('noCategory')});

  const [types, setTypes] = useState<ListItem[]>([]);
  const [currentType, setCurrentType] = useState<ListItem>({id: 0, value: t('undefined')});
  
  const [error, setError] = useState<boolean>(false);

  const [openAddVuln, setOpenAddVuln] = useState(false);
  const openAddVulnSlidingPage = () => setOpenAddVuln(true);

  const [openEditVuln, setOpenEditVuln] = useState<boolean>(false)
  const [editVuln, setEditVuln] = useState<VulnerabilityData>()

  const [tableInfo, setTableInfo] = useState<any[]>([])


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
        value: item.language,
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
        value: item.name
      }));
      setTypes([typeNames])
      if (typeNames.length > 0){
        setTypes([currentType, ...typeNames]);
      } else{
        setTypes([currentType]);
      }
    } catch (err) {
      setError(true);
    }
  }

  const fetchCategories = async () => {
    try {
      const dataCategory = await getCategories();
      const categoryNames = dataCategory.datas.map((item: CategoryData, index: number) => ({
        id: index + 1,
        value: item.name
      }));
      if (categoryNames.length > 0){
        setCategories([currentCategory, ...categoryNames]);
      } else{
        setCategories([currentCategory]);
      }
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




  // Testing Table


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

  const deleteRegister = async (item: any) => {
    await deleteVulnerability(item._id)
    fetchVulnerabilities()
  }



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
      onClick: (item: any) => deleteRegister(item),
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
      <Card title={t("nav.vulnerabilities")}>
        <>
          <div className="fixed">
            {openAddVuln && <AddVulnerability isOpen={openAddVuln} handlerIsOpen={setOpenAddVuln} categoryVuln={currentCategory.value} languages={languages} types={types} refreshVulns={fetchVulnerabilities}/>}
          </div>
          <div className="fixed">
          {openAddVuln && <AddVulnerability isOpen={openAddVuln} handlerIsOpen={setOpenAddVuln} categoryVuln={currentCategory.value} languages={languages} types={types} refreshVulns={fetchVulnerabilities}/>}          
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
            <div>
              {!loadingLanguage && <SelectDropdown 
                title={t('languages')} 
                items={languages}
                selected={currentLanguage}
                onChange={setCurrentLanguage}
              />}
            </div>
            <div className="ml-1">
              <span className="mx-1">{t('btn.valid')}</span>
              <PrimarySwitch enabled={enabledValid} onChange={setEnabledValid}/>  <></>
            </div>
           <div className="ml-1"> 
              <span className="mx-1">{t('btn.new')}</span>
              <PrimarySwitch enabled={enabledNew} onChange={setEnabledNew}/>
            </div>
            <div className="ml-1 mr-6">
              <span className="mx-1">{t('btn.updates')}</span>
              <PrimarySwitch enabled={enabledUpdate} onChange={setEnabledUpdate}/>
            </div>
            <div className="flex">
              <div className="mt-2 mx-2">
                <PrimaryButton>
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
