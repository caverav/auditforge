import PrimarySwitch from "../../components/switch/PrimarySwitch"
import PrimaryButton from "../../components/button/PrimaryButton"
import { useState, useEffect, ChangeEvent } from "react";
import SimpleInput from "../../components/input/SimpleInput";
import { getLanguages, getCategories, getTypes, getVulnerabilities } from "../../services/vulnerabilities";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { t } from "i18next"
import AddVulnerability from "./addVulnerability";

type Details = {
  locale: string;
  title: string;
  vulnType: string;
  description: string;
  observation: string;
  remediation: string;
  cwes: string[];
  references: string[];
  customFields: string[];
} 

type VulnerabilityData = {
  _id: string;
  cvssv3: string;
  priority: number;
  remediationComplexity: string;
  details: Details[];
  status: number;
  category: string; 
  __v: number;
  createdAt: string;
  updatedAt: string;
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

export const Vulnerabilities = () => {
  const [enabledValid, setEnabledValid] = useState(false)
  const [enabledNew, setEnabledNew] = useState(false)
  const [enabledUpdate, setEnabledUpdate] = useState(false)

  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityData[]>([]);
  const [loadingVulnerability, setLoadingVulnerability] = useState<boolean>(true);

  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem>({id: 0, value: ''});
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  const [categories, setCategories] = useState<ListItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ListItem>({id: 0, value: t('noCategory')});
  const [loadingCategory, setLoadingCategory] = useState<boolean>(true);

  const [types, setTypes] = useState<ListItem[]>([]);
  const [currentType, setCurrentType] = useState<ListItem>({id: 0, value: t('undefined')});
  const [loadingType, setLoadingType] = useState<boolean>(true);

  const [textTitle, setTextTitle] = useState<string>('');


  //// Testing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  
  
  
  ////


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataVulnerability = await getVulnerabilities();
        setVulnerabilities(dataVulnerability.datas);
        setLoadingVulnerability(false);
   

        const dataLanguage = await getLanguages();
        const languageNames = dataLanguage.datas.map((item: LanguageData, index: number) => ({
          id: index,
          value: item.language,
        }));
        setLanguages(languageNames);
        setCurrentLanguage(languageNames[0]);
        setLoadingLanguage(false);

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
        setLoadingCategory(false);

        const dataType = await getTypes();
        const typeNames = dataType.datas.map((item: TypeData, index: number) => ({
          id: index + 1,
          value: item.name
        }));
        if (typeNames.length > 0){
          setTypes([currentType, ...typeNames]);
        } else{
          setTypes([currentType]);
        }
        setLoadingType(false);

        
      } catch (err) {
        setLoadingLanguage(false);
      }
    };

    fetchData();
  }, []);  
        
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
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
            <div className="mt-2 mx-2">
              <PrimaryButton onClick={openModal}>
                <span className="mx-1">{t('newVulnerability')}</span>
              </PrimaryButton>
              <div className="fixed z-50">
              
                {isModalOpen && <AddVulnerability isOpen={isModalOpen} handlerIsOpen={setIsModalOpen}/>}
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex justify-between items-center mb-4">
        </div>
        
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2 top-2.5">
            <SimpleInput
              label={t('title')}
              id="title"
              name="title"
              type="text"
              placeholder="search"
              value={textTitle}
              onChange={setTextTitle}
            />
          </div>
          <div className="w-1/6">
            {!loadingCategory && <SelectDropdown 
              title={t('category')} 
              items={categories}
              selected={currentCategory}
              onChange={setCurrentCategory}
            />}
          </div>
          <div className="w-1/6">
            {!loadingType && <SelectDropdown 
              title={t('type')} 
              items={types}
              selected={currentType}
              onChange={setCurrentType}
            />}
          </div>
        </div>
        
        <div className="">
          <ul className="list-none p-0 m-0">
            {!loadingVulnerability && vulnerabilities.map((item) => (
              <li key={item._id} className="py-2 mb-4 flex space-x-4">
                <span className="w-1/2">{item.details[0].title}</span>  
                <span className="w-1/6">{item.category}</span>
                <span className="w-1/6">{item.details[0].vulnType}</span>
              </li>
            ))}
        </ul>
        </div>
        <hr className="h-1 my-3 bg-gray-600 border-0 rounded" />
      </div>
    </div>
  );

};
