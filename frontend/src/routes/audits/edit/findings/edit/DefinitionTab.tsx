import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../../components/input/SimpleInput';
import RichText from '../../../../../components/text/RichText';
import TextArea from '../../../../../components/text/TextArea';
import { getFinding } from '../../../../../services/audits';
import { getTypes } from '../../../../../services/vulnerabilities';
import { NavigatorTab } from './NavigatorTab';

type CWERelated = {
  cwe: string;
  cweParent?: string;
  cweGrandParent?: string;
};

type TypeData = {
  name: string;
  locale: string;
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type ListItemCategory = {
  id: number;
  value: string;
  label?: string;
  isNull?: boolean;
};

type GetFinding = {
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
  remediationComplexity?: number;
  priority?: number;
  scope?: string;
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
  cvssv3: string | null;
  priority?: number | '';
  remediationComplexity?: number | '';
  details: Details[];
  status?: number;
  category?: string | null;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
};

type DefinitionTabProps = {
  currentType: ListItem | null;
  finding: EditFinding;
  onChangeText: (value: string, field: string) => void;
  onChangeListItem: (value: ListItem, field: string) => void;
  typesList: ListItem[];
};

// TODO: add language prop
export const DefinitionTab: React.FC<DefinitionTabProps> = ({
  currentType,
  finding,
  onChangeText,
  onChangeListItem,
  typesList,
}) => {
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
      <div className="">
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
        <div className="mx-4 pb-4">
          <TextArea
            id=""
            label={t('poc')}
            name="poc"
            onChange={value => onChangeText(value, 'poc')}
            placeholder=""
            rows={4}
            value={finding.poc ?? ''}
          />
          <TextArea
            id=""
            label={t('cwes')}
            name="cwes"
            onChange={value => onChangeText(value, 'cwes')}
            placeholder=""
            rows={4}
            value={finding.cwes}
          />
        </div>
      </div>
    </div>
  );
};
