import PrimarySwitch from "../../components/switch/PrimarySwitch"
import PrimaryButton from "../../components/button/PrimaryButton"
import { useState, useEffect } from "react";2
import SimpleInput from "../../components/input/SimpleInput";
import { getLanguages, getCategories, getTypes } from "../../services/vulnerabilities";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import { t } from "i18next"

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

export const Vulnerabilities = () => {
  const [enabledValid, setEnabledValid] = useState(false)
  const [enabledNew, setEnabledNew] = useState(false)
  const [enabledUpdate, setEnabledUpdate] = useState(false)

  //const [languages, setLanguages] = useState<any[]>([]);
  //const [currentLanguage, setCurrentLanguage] = useState<any>();
  const [languages, setLanguages] = useState<ListItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<any>({id: 0, value: ''});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<ListItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<any>({id: 0, value: t('noCategory')});

  const [types, setTypes] = useState<ListItem[]>([]);
  const [currentType, setCurrentType] = useState<any>({id: 0, value: t('undefined')});

  const [textTitle, setTextTitle] = useState<string>('');

 

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getLanguages();
        const languageNames = data.datas.map((item: LanguageData, index: number) => ({
          id: index,
          value: item.language,
        }));
        setLanguages(languageNames);
        setCurrentLanguage(languageNames[0]);
        setLoading(false);
      } catch (err) {
        setError("Error fetching languages");
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const categoryNames = data.datas.map((item: CategoryData, index: number) => ({
          id: index + 1,
          value: item.name
        }));
        if (categoryNames.length > 0){

          setCategories([currentCategory, ...categoryNames]);
        } else{
          setCategories([currentCategory]);
        }
        console.log(categories)
        
        setLoading(false);
      } catch (err) {
        setError("Error fetching languages");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const data = await getTypes();
        const typeNames = data.datas.map((item: TypeData, index: number) => ({
          id: index + 1,
          value: item.name
        }));
        if (typeNames.length > 0){

          setTypes([currentType, ...typeNames]);
        } else{
          setTypes([currentType]);
        }

        setLoading(false);
      } catch (err) {
        setError("Error fetching languages");
        setLoading(false);
      }
    };

    fetchType();
  }, []);

  

  
        
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
        <div className="flex items-center mb-4">
          <div>
            <SelectDropdown 
              title={t('languages')} 
              items={languages}
              selected={currentLanguage}
              onChange={setCurrentLanguage}
            />
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
              <PrimaryButton>
                <span className="mx-1">{t('newVulnerability')}</span>
              </PrimaryButton>
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
          <div className="w-1/4">
            <SelectDropdown 
              title={t('category')} 
              items={categories}
              selected={currentCategory}
              onChange={setCurrentCategory}
            />
          </div>
          <div className="w-1/4">
            <SelectDropdown 
              title={t('search')} 
              items={types}
              selected={currentType}
              onChange={setCurrentType}
            />
          </div>
        </div>
        <hr className="h-1 my-3 bg-gray-600 border-0 rounded" />
        <div className="">
          No matching records found {t('total')}
        </div>
      </div>
    </div>
  );

};
