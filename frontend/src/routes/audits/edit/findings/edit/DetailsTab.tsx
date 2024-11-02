import { t } from 'i18next';
import { useCallback } from 'react';
import { toast } from 'sonner';

import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import RichText from '../../../../../components/text/RichText';
import CVSSCalculator from '../../../../vulnerabilities/components/CVSSCalculator';

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
  description?: string | '';
  observation?: string | '';
  poc?: string | '';
  remediation?: string | '';
  cvssv3?: string | '';
  remediationComplexity?: number | '';
  priority?: number | '';
  scope?: string | '';
  vulnType?: string | '';
};

type DetailTabProps = {
  finding: EditFinding;
  onChangeText: (value: string, field: string) => void;
  onChangeListItem: (value: ListItem, field: string) => void;
  priority: ListItem | null;
  remediationComplexity: ListItem | null;
};

// TODO: add language prop
export const DetailsTab: React.FC<DetailTabProps> = ({
  finding,
  onChangeText,
  onChangeListItem,
  priority,
  remediationComplexity,
}) => {
  const complexityOptions = [
    { id: 1, value: t('easy') },
    { id: 2, value: t('medium') },
    { id: 3, value: t('complex') },
  ];

  const priorityOptions = [
    { id: 1, value: t('low') },
    { id: 2, value: t('medium') },
    { id: 3, value: t('high') },
    { id: 4, value: t('urgent') },
  ];

  const handleCvssRecomendation = () => {
    if (finding.description === '' || finding.description === '<p><br></p>') {
      toast.error(t('err.descriptionRequired'));
      return '';
    } else {
      return finding.description ?? '';
    }
  };

  const handleCvssChange = useCallback((newCvssVector: string) => {
    onChangeText(newCvssVector, 'cvssv3');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <RichText
          label={t('affectedAssets')}
          onChange={value => onChangeText(value, 'scope')}
          placeholder=""
          value={finding.scope ?? ''}
        />
      </div>
      <div className="mx-4 flex justify-center">
        <CVSSCalculator
          cvssStringInitial={finding.cvssv3}
          handleCvssChange={handleCvssChange}
          handleCvssRecomendation={handleCvssRecomendation}
        />
      </div>
      <span className="px-4 text-xl font-semibold pt-4">
        {t('courseOfActions')}
      </span>
      <div className="flex flex-col md:flex-row md:gap-4 gap-2 w-full px-4">
        <div className="w-full md:w-1/2">
          <SelectDropdown
            items={complexityOptions}
            onChange={value => onChangeListItem(value, 'remediationComplexity')}
            selected={remediationComplexity}
            title={t('remediationComplexity')}
          />
        </div>
        <div className="w-full md:w-1/2">
          <SelectDropdown
            items={priorityOptions}
            onChange={value => onChangeListItem(value, 'priority')}
            selected={priority}
            title={t('priority')}
          />
        </div>
      </div>
      <div className="">
        <RichText
          label={t('remediation')}
          onChange={value => onChangeText(value, 'remediation')}
          placeholder=""
          value={finding.remediation ?? ''}
        />
      </div>
    </div>
  );
};
