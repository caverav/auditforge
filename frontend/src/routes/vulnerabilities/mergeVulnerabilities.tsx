import { useState } from "react";
import { t } from "i18next";
import { XMarkIcon } from '@heroicons/react/24/outline';
import PrimaryButton from "../../components/button/PrimaryButton";
import SelectDropdown from "../../components/dropdown/SelectDropdown";



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

interface ListItem {
  id: number;
  value: string;
  label?: string;
  locale?: string;
}

interface RadioOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

type MergeVulnProps = {
  isOpen: boolean;
  handlerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vulnerabilities: VulnerabilityData[];
  languages: ListItem[];
}

const MergeVulnerabilities: React.FC<MergeVulnProps> = ({ isOpen, handlerIsOpen, vulnerabilities, languages}) => {

  const [selectedLanguageLeft, setSelectedLanguageLeft] = useState<ListItem|null>(null);
  const [selectedLanguageRight, setSelectedLanguageRight] = useState<ListItem|null>(null);


  const handlerLeftChange = (item: ListItem) => {
    setSelectedLanguageLeft(item)
  }

  const handlerRightChange = (item: ListItem) => {
    setSelectedLanguageRight(item)
  }

  const onSubmitMerge = () => {
    console.log("asd")
  }



/*

<div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => changed ? setOpenModal(true) : setOpenModal(false)}
            aria-hidden="true"
        />
*/
  return (
    <>
        
      <div className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => handlerIsOpen(false)}
          aria-hidden="true"
        />
        <div className="relative bg-gray-700 p-2 rounded-lg shadow-lg w-3/5 h-1/2 flex flex-col">
        <div className="mx-3 mt-2 flex items-center justify-between">
          <span className="text-xl text-white font-bold p-1">{t('mergeVulnerabilities')}</span>
          <button
              onClick={() => handlerIsOpen(false)}
              className="bg-transparent text-white rounded"
          >
              <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <hr className="h-1 mx-3 mb-1 bg-gray-600 border-0 rounded" />
        <div className="flex justify-between space-x-4 mx-3 flex-1 overflow-auto ">
          <div className="w-1/2 overflow-auto mt-2">
            <SelectDropdown 
              items={languages}
              selected={selectedLanguageLeft}
              onChange={(value) => handlerLeftChange(value)}
              placeholder={t('languageAddFromRight')}
              title=""
            />
            
          </div>
          <div className="w-0.5 h-full bg-gray-600"></div>
          <div className="w-1/2 overflow-auto mt-2">
            <SelectDropdown 
              items={languages}
              selected={selectedLanguageRight}
              onChange={(value) => handlerRightChange(value)}
              placeholder={t('languageMoveToLeft')}
              title=""
            />
          </div>
        </div>
        <div className="flex justify-center pt-2 border-t-gray-600 border-t-2">
          <PrimaryButton onClick={onSubmitMerge}>
            <span>MERGE</span>
          </PrimaryButton>
          
        </div>
        </div>
      </div>
    </>
    )
};
export default MergeVulnerabilities;