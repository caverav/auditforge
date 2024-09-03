import { XMarkIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import DefaultRadioGroup from '../../../components/button/DefaultRadioGroup';
import PrimaryButton from '../../../components/button/PrimaryButton';
import SelectDropdown from '../../../components/dropdown/SelectDropdown';
import { mergeVulnerability } from '../../../services/vulnerabilities';

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
  details: Details[];
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type RadioOption = {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
};

type MergeVulnerability = {
  idIzq: string;
  rightSide: {
    vulnId: string;
    locale: string;
  };
};

type MergeVulnProps = {
  isOpen: boolean;
  handlerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vulnerabilities: VulnerabilityData[];
  languages: ListItem[];
  refreshVulns: () => void;
  handleOnSuccess: (message: string) => void;
};

const MergeVulnerabilities: React.FC<MergeVulnProps> = ({
  isOpen,
  handlerIsOpen,
  vulnerabilities,
  languages,
  refreshVulns,
  handleOnSuccess,
}) => {
  const [selectedLanguageLeft, setSelectedLanguageLeft] =
    useState<ListItem | null>(null);
  const [currentRadioOptionsLeft, setCurrentRadioOptionsLeft] = useState<
    RadioOption[]
  >([]);
  const [selectedRadioLeft, setSelectedRadioLeft] = useState('');

  const [selectedLanguageRight, setSelectedLanguageRight] =
    useState<ListItem | null>(null);
  const [currentRadioOptionsRight, setCurrentRadioOptionsRight] = useState<
    RadioOption[]
  >([]);
  const [selectedRadioRight, setSelectedRadioRight] = useState('');

  const [allDetails] = useState(
    vulnerabilities.flatMap(vuln =>
      vuln.details.map(detail => ({
        id: vuln._id,
        locale: detail.locale,
        title: detail.title,
      })),
    ),
  );

  const checkLeft = useCallback(() => {
    const leftFiltered = allDetails.filter(
      detailIter => detailIter.locale === selectedLanguageLeft?.value,
    );

    const rightFilteredIds = new Set(
      allDetails
        .filter(
          detailIter => detailIter.locale === selectedLanguageRight?.value,
        )
        .map(item => item.id),
    );

    const leftOptions = leftFiltered
      .filter(item => !rightFilteredIds.has(item.id))
      .map(item => ({
        id: item.id,
        value: [item.id, item.locale].join('.'),
        label: item.title ?? '',
      }));

    setCurrentRadioOptionsLeft(leftOptions);
  }, [allDetails, selectedLanguageLeft?.value, selectedLanguageRight?.value]);

  const checkRight = useCallback(() => {
    const rightFiltered = allDetails.filter(
      detailIter => detailIter.locale === selectedLanguageRight?.value,
    );

    const leftFilteredIds = new Set(
      allDetails
        .filter(detailIter => detailIter.locale === selectedLanguageLeft?.value)
        .map(item => item.id),
    );

    const rightOptions = rightFiltered
      .filter(item => !leftFilteredIds.has(item.id))
      .map(item => ({
        id: item.id,
        value: [item.id, item.locale].join('.'),
        label: item.title ?? '',
      }));

    setCurrentRadioOptionsRight(rightOptions);
  }, [allDetails, selectedLanguageLeft?.value, selectedLanguageRight?.value]);

  useEffect(() => {
    checkLeft();
    checkRight();
  }, [checkLeft, checkRight, selectedLanguageLeft, selectedLanguageRight]);

  const handlerLeftChange = (item: ListItem) => {
    setSelectedLanguageLeft(item);
  };

  const handlerRightChange = (item: ListItem) => {
    setSelectedLanguageRight(item);
  };

  const onSubmitMerge = async () => {
    if (selectedRadioLeft !== '' && selectedRadioRight !== '') {
      try {
        const [leftId] = selectedRadioLeft.split('.');
        const [rightId, rightLocale] = selectedRadioRight.split('.');
        const mergeObject: MergeVulnerability = {
          idIzq: leftId,
          rightSide: {
            vulnId: rightId,
            locale: rightLocale,
          },
        };
        const response = await mergeVulnerability(mergeObject);
        if (response.status === 'success') {
          handleOnSuccess(t('msg.vulnerabilityMergeOk'));
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error merging vulnerabilities');
        return;
      }
    } else {
      toast.error('Both vulnerabilities must be selected');
      return;
    }

    refreshVulns();
    handlerIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => handlerIsOpen(false)}
      />
      <Toaster />
      <div className="relative bg-gray-700 p-2 rounded-lg shadow-lg w-3/5 h-1/2 flex flex-col">
        <div className="mx-3 mt-2 flex items-center justify-between">
          <span className="text-xl text-white font-bold p-1">
            {t('mergeVulnerabilities')}
          </span>
          <button
            className="bg-transparent text-white rounded"
            onClick={() => handlerIsOpen(false)}
            type="button"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <hr className="h-1 mx-3 mb-1 bg-gray-600 border-0 rounded" />
        <div className="flex justify-between space-x-4 mx-3 flex-1 overflow-auto ">
          <div className="w-1/2 overflow-auto mt-2">
            <SelectDropdown
              items={languages}
              onChange={value => handlerLeftChange(value)}
              placeholder={t('languageAddFromRight')}
              selected={selectedLanguageLeft}
              title=""
            />
            <div className="pl-1 mt-5">
              <DefaultRadioGroup
                name="left"
                onChange={setSelectedRadioLeft}
                options={currentRadioOptionsLeft}
                value={selectedRadioLeft}
              />
            </div>
          </div>
          <div className="w-0.5 h-full bg-gray-600" />
          <div className="w-1/2 overflow-auto mt-2">
            <SelectDropdown
              items={languages}
              onChange={value => handlerRightChange(value)}
              placeholder={t('languageMoveToLeft')}
              selected={selectedLanguageRight}
              title=""
            />
            <div className="pl-1 mt-5">
              <DefaultRadioGroup
                name="right"
                onChange={setSelectedRadioRight}
                options={currentRadioOptionsRight}
                value={selectedRadioRight}
              />
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
  );
};
export default MergeVulnerabilities;
