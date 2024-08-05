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
  const [currentCategory, setCurrentCategory] = useState<any>({id: 0, value: ''});

  const [types, setTypes] = useState<ListItem[]>([]);
  const [currentType, setCurrentType] = useState<any>({id: 0, value: ''});

  /*
  useEffect(() => {
    if (currentLanguage.value !== '') {
      console.log("ahora2");
      console.log(languages[0]);
      setCurrentLanguage(languages[0]);
    }
  }, [currentLanguage]);
*/
 

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await getLanguages();
        const languageNames = data.datas.map((item: LanguageData, index: number) => ({
          id: index,
          value: item.language,
        }));
        setLanguages(languageNames);
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
          id: index,
          value: item.name
        }));
        setCategories(categoryNames);
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
          id: index,
          value: item.name
        }));
        setTypes(typeNames);
        setLoading(false);
      } catch (err) {
        setError("Error fetching languages");
        setLoading(false);
      }
    };

    fetchType();
  }, []);


  useEffect(() => {
    if (languages.length > 0 && currentLanguage.value === '') {
      console.log('Estableciendo currentLanguage: ', languages[0]);
      setCurrentLanguage(languages[0]);
    }
  }, [languages, currentLanguage]);
  
  useEffect(() => {
    if (categories.length > 0 && currentCategory.value === '') {
      console.log('Estableciendo currentLanguage: ', categories[0]);
      setCurrentCategory(categories[0]);
    }
  }, [categories, currentCategory]);

  useEffect(() => {
    if (types.length > 0 && currentType.value === '') {
      console.log('Estableciendo currentLanguage: ', types[0]);
      setCurrentType(types[0]);
    }
  }, [types, currentType]);
 
  /* 
         <SelectDropdown 
              title={t('languages')} 
              items={languages}
              selected={currentLanguage}
              onChange={setLanguage}
            />


        <div>{JSON.stringify(languages)}</div>
        <div>{JSON.stringify(language)}</div>
  */

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
            <button className="bg-teal-500 text-white rounded px-4 py-2 justify-self-end">{t('mergeVulnerabilities')}</button>
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
          <input type="text" placeholder="Search" className="border border-gray-300 rounded p-2 w-1/2" />
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
        <div className="">
          No matching records found
        </div>
      </div>
    </div>
  );

};
