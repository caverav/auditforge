import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getFinding } from '../../../../../services/audits';
import { getTypes } from '../../../../../services/vulnerabilities';
import { DefinitionTab } from './DefinitionTab';

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

type Tab = {
  label: string;
  content: React.ReactNode;
};

// TODO: add language prop
export const Edit = () => {
  const findingId = useParams().findingId ?? '';
  const auditId = useParams().auditId ?? '';

  const [activeTab, setActiveTab] = useState(0);

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

  const tabs: Tab[] = [
    {
      label: t('definition'),
      content: (
        <div>
          {finding ? (
            <DefinitionTab
              currentType={currentType}
              finding={finding}
              onChangeListItem={onChangeListItem}
              onChangeText={onChangeText}
              typesList={typesList}
            />
          ) : null}
        </div>
      ),
    },
    {
      label: t('proofs'),
      content: (
        <div>
          {finding ? (
            <DefinitionTab
              currentType={currentType}
              finding={finding}
              onChangeListItem={onChangeListItem}
              onChangeText={onChangeText}
              typesList={typesList}
            />
          ) : null}
        </div>
      ),
    },
    {
      label: t('details'),
      content: (
        <div>
          {finding ? (
            <DefinitionTab
              currentType={currentType}
              finding={finding}
              onChangeListItem={onChangeListItem}
              onChangeText={onChangeText}
              typesList={typesList}
            />
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {finding ? (
        <div>
          <div className="m-4 bg-gray-900 rounded-lg p-4 flex flex-col gap-4">
            <span className="w-full">{finding.title}</span>
            <div className="w-full">
              {tabs.map((tab, index) => (
                <button
                  className={`py-2 px-4 font-semibold text-gray-200 w-1/3 ${
                    activeTab === index
                      ? 'border-b-2 border-gray-400 text-black'
                      : 'text-gray-400'
                  }`}
                  key={index}
                  onClick={() => setActiveTab(index)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="m-4 bg-gray-900 rounded-lg">
            {tabs[activeTab].content}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {JSON.stringify(finding)}
    </div>
  );
};
