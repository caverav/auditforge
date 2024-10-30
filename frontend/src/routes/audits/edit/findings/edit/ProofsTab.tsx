import { t } from 'i18next';

import RichText from '../../../../../components/text/RichText';

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

type ProofsTabProps = {
  currentType: ListItem | null;
  finding: EditFinding;
  onChangeText: (value: string, field: string) => void;
  onChangeListItem: (value: ListItem, field: string) => void;
  typesList: ListItem[];
};

// TODO: add language prop
export const ProofsTab: React.FC<ProofsTabProps> = ({
  finding,
  onChangeText,
}) => {
  return (
    <div className="">
      <div className="w-full">
        <RichText
          label={t('proofs')}
          onChange={(value: string) => onChangeText(value, 'poc')}
          placeholder=""
          value={finding.poc ?? ''}
        />
      </div>
    </div>
  );
};
