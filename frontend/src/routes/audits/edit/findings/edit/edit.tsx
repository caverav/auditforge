import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../../components/input/SimpleInput';
import RichText from '../../../../../components/text/RichText';
import TextArea from '../../../../../components/text/TextArea';

import { getFinding } from '../../../../../services/audits';
import { getTypes } from '../../../../../services/vulnerabilities';

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

// TODO: add language prop
export const Edit = () => {
  const findingId = useParams().findingId ?? '';
  const auditId = useParams().auditId ?? '';

  const [finding, setFinding] = useState<EditFinding | null>(null);
  //TODO: Add language filter
  const [currentType, setCurrentType] = useState<ListItem | null>(null);

  const [typesList, setTypesList] = useState<ListItem[]>([]);

  const onChangeText = (value: string, field: string) => {
    setFinding({ ...finding, [field]: value });
  };

  const onChangeListItem = (value: ListItem, field: string) => {
    setFinding({ ...finding, [field]: value.value });
    setCurrentType(value);
  };

  const fetchTypes = async () => {
    try {
      const dataType = await getTypes();
      const typeNames = dataType.datas.map((item: TypeData, index: number) => ({
        id: index + 1,
        value: item.name,
        label: item.name,
        locale: item.locale,
      }));
      setTypesList([...typeNames]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchFinding = async () => {
    try {
      const findingGet = await getFinding(auditId, findingId);
      const findingData = findingGet.datas;
      if (findingData.vulnType) {
        setCurrentType({
          id: typesList.length + 1,
          label: findingData.vulnType,
          value: findingData.vulnType,
        });
      }
      setFinding({
        identifier: findingData.identifier,
        title: findingData.title,
        references: findingData.references,
        cwes: findingData.cwes,
        status: findingData.status,
        _id: findingData._id,
        paragraphs: findingData.paragraphs,
        customFields: findingData.customFields,
        description: findingData.description ?? '',
        observation: findingData.observation ?? '',
        poc: findingData.poc ?? '',
        remediation: findingData.remediation ?? '',
        cvssv3: findingData.cvssv3 ?? '',
        remediationComplexity: findingData.remediationComplexity ?? '',
        priority: findingData.priority ?? '',
        scope: findingData.scope ?? '',
        vulnType: findingData.vulnType ?? '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    void fetchTypes();
    void fetchFinding();
  }, []);

  return (
    <div className="">
      {finding ? (
        <div>
          <div className="m-4 bg-gray-900 rounded-lg p-4">test</div>
          <div className="m-4 bg-gray-900 rounded-lg">
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {JSON.stringify(finding)}
    </div>
  );
};
