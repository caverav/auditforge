import { useEffect, useState } from "react";
import { t } from "i18next";
import { XMarkIcon } from '@heroicons/react/24/outline';
import PrimaryButton from "../../components/button/PrimaryButton";
import SelectDropdown from "../../components/dropdown/SelectDropdown";
import DefaultRadioGroup from "../../components/button/DefaultRadioGroup";
import { mergeVulnerability } from "../../services/vulnerabilities";

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
  details: Details[];
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

interface mergeVulnerability {
  idIzq: string;
  rightSide: {
    vulnId: string;
    locale: string;
  }
}

type MergeVulnProps = {
  isOpen: boolean;
  handlerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vulnerabilities: VulnerabilityData[];
  languages: ListItem[];
}

const MergeVulnerabilities: React.FC<MergeVulnProps> = ({ isOpen, handlerIsOpen, vulnerabilities, languages}) => {

  const [selectedLanguageLeft, setSelectedLanguageLeft] = useState<ListItem|null>(null);
  const [currentRadioOptionsLeft, setCurrentRadioOptionsLeft] = useState<RadioOption[]>()
  const [selectedRadioLeft, setSelectedRadioLeft] = useState('');
  const [isLeftEnabled, setIsLeftEnabled] = useState<boolean>(false)
  
  const [selectedLanguageRight, setSelectedLanguageRight] = useState<ListItem|null>(null);
  const [currentRadioOptionsRight, setCurrentRadioOptionsRight] = useState<RadioOption[]>()
  const [selectedRadioRight, setSelectedRadioRight] = useState('');
  const [isRightEnabled, setIsRightEnabled] = useState<boolean>(false)

  const [error, setError] = useState<string | null>(null);


  const [allDetails, setAllDetails] = useState(
    vulnerabilities.flatMap(vuln => 
      vuln.details.map(detail => ({
        id: vuln._id,
        locale: detail.locale,
        title: detail.title
      }))
    )
  )

  const checkLeft = () => {
    const leftFiltered = allDetails
      .filter(detailIter => detailIter.locale === selectedLanguageLeft?.value)
    
    const rightFilteredIds = new Set(
      allDetails
        .filter(detailIter => detailIter.locale === selectedLanguageRight?.value)
        .map(item => item.id)
    );

    const leftOptions = leftFiltered
      .filter(item => !rightFilteredIds.has(item.id))
      .map((item) => ({
        id: item.id,
        value: [item.id,item.locale].join("."),
        label: item.title || ""
      }))

    leftOptions.length > 0 ? setIsLeftEnabled(true) : setIsLeftEnabled(false)
    setCurrentRadioOptionsLeft(leftOptions)
  }

  const checkRight = () => {
    const rightFiltered = allDetails
      .filter(detailIter => detailIter.locale === selectedLanguageRight?.value)

    const leftFilteredIds = new Set(
      allDetails
        .filter(detailIter => detailIter.locale === selectedLanguageLeft?.value)
        .map(item => item.id)
    );

    const rightOptions = rightFiltered
      .filter(item => !leftFilteredIds.has(item.id))
      .map((item) => ({
        id: item.id,
        value: [item.id,item.locale].join("."),
        label: item.title || ""
      }))
    console.log(rightOptions)
    rightOptions.length > 0 ? setIsRightEnabled(true) : setIsRightEnabled(false)
    setCurrentRadioOptionsRight(rightOptions)
  }

  useEffect(() => {
    checkLeft();
    checkRight();
  }, [selectedLanguageLeft, selectedLanguageRight])

  const handlerLeftChange = (item: ListItem) => {
    setSelectedLanguageLeft(item);
  }

  const handlerRightChange = (item: ListItem) => {
    setSelectedLanguageRight(item)
  }

  const onSubmitMerge = async () => {
    
    // Falta logica de validación que verifique que los dos radios están seleccionados
    
    if (selectedRadioLeft !== '' && selectedRadioRight !== ''){
      try {
        const [leftId, leftLocale] = selectedRadioLeft.split('.')
        const [rightId, rightLocale] = selectedRadioRight.split('.')
        const mergeObject : mergeVulnerability = {
          idIzq: leftId,
          rightSide: {
            vulnId: rightId,
            locale: rightLocale
          }
        }
        const response = await mergeVulnerability(mergeObject);
        console.log(response)
      } catch (error) {
        setError("Error creating vulnerability");
        console.error("Error:", error);
      }
    }

    // Se hace un refresh 

    // Se cierra el modal
    handlerIsOpen(false)
  }

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
            <div className="pl-1 mt-5">
              { isLeftEnabled &&
              <DefaultRadioGroup
                name="left"
                options={currentRadioOptionsLeft!}
                value={selectedRadioLeft}
                onChange={setSelectedRadioLeft}
              />}
            </div>
          </div>
          <div className="w-0.5 h-full bg-gray-600"></div>
          <div className="w-1/2 overflow-auto mt-2">
            <div className="">
              <SelectDropdown 
                items={languages}
                selected={selectedLanguageRight}
                onChange={(value) => handlerRightChange(value)}
                placeholder={t('languageMoveToLeft')}
                title=""
              />
            </div>
            <div className="pl-1 mt-5">
              { isRightEnabled &&
              <DefaultRadioGroup
                name="right"
                options={currentRadioOptionsRight!}
                value={selectedRadioRight}
                onChange={setSelectedRadioRight}
              />}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 border-t-gray-600 border-t-2">
          <PrimaryButton onClick={onSubmitMerge}>
            <span>{t('merge')}</span>
          </PrimaryButton>
        </div>
        </div>
      </div>
    </>
    )
};
export default MergeVulnerabilities;