import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { t } from 'i18next';
import { useState } from 'react';
import { toast } from 'sonner';

import PrimaryButton from '../../../../../components/button/PrimaryButton';
import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../../components/input/SimpleInput';
import RichText from '../../../../../components/text/RichText';
import TextArea from '../../../../../components/text/TextArea';
import GetCWENameByLanguage from '../../../../../services/getCWEName';
import { postDescriptionCWE } from '../../../../../services/vulnerabilities';
import MultiCheckboxButton from '../../../../vulnerabilities/components/MultiCheckboxButton';

type CWERelated = {
  cwe: string;
  cweParent?: string;
  cweGrandParent?: string;
};

type CWEData = {
  priority: number;
  label: string;
  score: number;
};

type PostDescription = {
  vuln: string;
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type EditFinding = {
  identifier: number;
  title: string;
  references: string[];
  cwes: string[];
  status: number;
  _id: string;
  paragraphs: string[];
  customFields: string[];
  description?: string;
  observation?: string;
  poc?: string;
  remediation?: string;
  cvssv3?: string;
  remediationComplexity?: number | '';
  priority?: number | '';
  scope?: string;
  vulnType?: string;
};

type DefinitionTabProps = {
  currentType: ListItem | null;
  finding: EditFinding;
  handlerRecommendCWE: (value: string[]) => void;
  locale: string;
  onChangeArray: (value: string, field: string) => void;
  onChangeText: (value: string, field: string) => void;
  onChangeListItem: (value: ListItem, field: string) => void;
  typesList: ListItem[];
};

export const DefinitionTab: React.FC<DefinitionTabProps> = ({
  currentType,
  finding,
  handlerRecommendCWE,
  locale,
  onChangeArray,
  onChangeText,
  onChangeListItem,
  typesList,
}) => {
  const [cweLoading, setCweLoading] = useState<boolean>(false);
  const [cweRecommendationSelected, setCweRecommendationSelected] = useState<
    string[]
  >([]);
  const [cweRecommended, setCweRecommended] = useState<CWERelated[]>([]);

  const handleCWERecomendation = async () => {
    if (finding.description === '' || finding.description === '<p><br></p>') {
      toast.error(t('err.descriptionRequired'));
      return;
    }
    const descriptionCWE: PostDescription = {
      vuln: finding.description ?? '',
    };

    try {
      setCweLoading(true);
      setCweRecommendationSelected([]);
      setCweRecommended([]);
      const responseCWE = await postDescriptionCWE(descriptionCWE);
      const sortedResult = responseCWE.result.sort(
        (a: CWEData, b: CWEData) => b.score - a.score,
      );
      const recommendedCWEs = GetCWENameByLanguage(locale, sortedResult);
      setCweRecommended(recommendedCWEs);
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('err.failedCWERecommendation'));
    } finally {
      setCweLoading(false);
    }
  };

  const handlerSubmitCWE = () => {
    handlerRecommendCWE(cweRecommendationSelected);
    setCweRecommendationSelected([]);
    setCweRecommended([]);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:gap-4 w-full p-4">
        <div className="w-full md:w-1/2">
          <SimpleInput
            id="title"
            label={t('title')}
            name="title"
            onChange={value => onChangeText(value, 'title')}
            placeholder=""
            requiredAlert
            requiredField
            type="text"
            value={finding.title}
          />
        </div>
        <div className="w-full md:w-1/2">
          <SelectDropdown
            items={typesList}
            onChange={value => onChangeListItem(value, 'vulnType')}
            selected={currentType}
            title={t('type')}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <RichText
          label={t('description')}
          onChange={value => onChangeText(value, 'description')}
          placeholder=""
          value={finding.description ?? ''}
        />
        <RichText
          label={t('observation')}
          onChange={value => onChangeText(value, 'observation')}
          placeholder=""
          value={finding.observation ?? ''}
        />
        <div className="mx-4 pb-4 flex flex-col gap-4">
          <TextArea
            id=""
            label={t('references')}
            name="poc"
            onChange={value => onChangeArray(value, 'references')}
            placeholder=""
            rows={4}
            value={finding.references.join('\n')}
          />
          <TextArea
            id=""
            label={t('CWEs')}
            name="cwes"
            onChange={value => onChangeArray(value, 'cwes')}
            placeholder=""
            rows={4}
            value={finding.cwes.join('\n')}
          />
        </div>
        <div className="mb-4 mx-4 flex">
          <PrimaryButton onClick={() => handleCWERecomendation()}>
            <span>{t('recommendCwe')}</span>
          </PrimaryButton>
          {cweLoading ? (
            <span className="ml-2">
              <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
            </span>
          ) : null}
        </div>
        {cweRecommended.length > 0 ? (
          <div className="mx-4 mb-4">
            <MultiCheckboxButton
              cweRecommendationSelected={cweRecommendationSelected}
              cwesRecommended={cweRecommended}
              setCweRecommendationSelected={setCweRecommendationSelected}
            />
            {cweRecommendationSelected.length > 0 ? (
              <PrimaryButton
                onClick={() => {
                  handlerSubmitCWE();
                }}
              >
                {t('btn.confirmSelection')}
              </PrimaryButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
