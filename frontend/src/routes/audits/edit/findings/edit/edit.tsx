import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import PrimaryButton from '../../../../../components/button/PrimaryButton';
import Modal from '../../../../../components/modal/Modal';
import {
  deleteFinding,
  getFinding,
  updateFinding,
} from '../../../../../services/audits';
import { getTypes } from '../../../../../services/vulnerabilities';
import { DefinitionTab } from './DefinitionTab';
import { DetailsTab } from './DetailsTab';
import { ProofsTab } from './ProofsTab';

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

type Tab = {
  label: string;
  content: React.ReactNode;
};

// TODO: add language prop
export const Edit = () => {
  const findingId = useParams().findingId ?? '';
  const auditId = useParams().auditId ?? '';
  const [openModalDeleteFinding, setOpenModalDeleteFinding] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [finding, setFinding] = useState<EditFinding | null>(null);
  //TODO: Add language filter
  const [currentType, setCurrentType] = useState<ListItem | null>(null);

  const [typesList, setTypesList] = useState<ListItem[]>([]);

  const [remediationComplexity, setRemediationComplexity] =
    useState<ListItem | null>(null);
  const [priority, setPriority] = useState<ListItem | null>(null);

  const onChangeText = (value: string, field: string) => {
    setFinding(prevFinding => {
      if (!prevFinding) {
        return null;
      }

      return {
        ...prevFinding,
        [field]: value,
      };
    });
  };

  const onChangeArray = (value: string, field: string) => {
    setFinding(prevFinding => {
      if (!prevFinding) {
        return null;
      }

      return {
        ...prevFinding,
        [field]:
          field === 'cwes' || field === 'references'
            ? value.split('\n')
            : value,
      };
    });
  };

  const handlerRecommendCWE = (value: string[]) => {
    setFinding(prevFinding => {
      if (!prevFinding) {
        return null;
      }

      return {
        ...prevFinding,
        cwes: [...value, ...prevFinding.cwes], // Aseguramos que solo contenga `string[]`
      };
    });
  };

  const onChangeListItem = (value: ListItem, field: string) => {
    setFinding(prevFinding => {
      if (!prevFinding) {
        return null;
      }
      let newValue: string | number;
      if (field === 'remediationComplexity') {
        setRemediationComplexity(value);
        newValue = value.id - 1;
      } else if (field === 'priority') {
        setPriority(value);
        newValue = value.id - 1;
      } else {
        setCurrentType(value);
        newValue = value.value;
      }
      return {
        ...prevFinding,
        [field]: newValue,
      };
    });
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

  const fetchFinding = useCallback(async () => {
    try {
      const findingGet = await getFinding(auditId, findingId);
      const findingData = findingGet.datas;
      //TODO: Fix vuln type if the type is not in the list
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditId, findingId]);

  useEffect(() => {
    void fetchTypes();
    void fetchFinding();
  }, [fetchFinding]);

  const tabs: Tab[] = [
    {
      label: t('definition'),
      content: (
        <div>
          {finding ? (
            <DefinitionTab
              currentType={currentType}
              finding={finding}
              handlerRecommendCWE={handlerRecommendCWE}
              onChangeArray={onChangeArray}
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
            <ProofsTab
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
            <DetailsTab
              finding={finding}
              onChangeListItem={onChangeListItem}
              onChangeText={onChangeText}
              priority={priority}
              remediationComplexity={remediationComplexity}
            />
          ) : null}
        </div>
      ),
    },
  ];

  const confirmDeleteFinding = async () => {
    try {
      const response = await deleteFinding(auditId, findingId);
      if (response.status === 'success') {
        toast.success(t('msg.findingDeleteOk'));
      }
    } catch (error) {
      toast.error(t('err.failedDeleteFinding'));
      console.error('Error:', error);
    }
    setOpenModalDeleteFinding(false);
    // void fetchFindings();
  };

  const submitUpdateFinding = async () => {
    if (finding === null) {
      return;
    }
    if (finding.title === '') {
      toast.error(t('err.titleRequired'));
      return;
    }

    const {
      paragraphs,
      cwes,
      references,
      customFields,
      identifier,
      title,
      status,
      _id,
      ...rest
    } = finding;

    const filteredRest = Object.fromEntries(
      Object.entries(rest).filter(
        ([_, value]) =>
          value !== '' && value !== '<p><br></p>' && value !== 'CVSS:3.1/',
      ),
    );

    const filteredFinding: EditFinding = {
      paragraphs,
      cwes,
      references,
      customFields,
      identifier,
      title,
      status,
      _id,
      ...filteredRest,
    };

    try {
      const response = await updateFinding(auditId, findingId, filteredFinding);
      if (response.status === 'success') {
        toast.success(t('msg.customFieldUpdatedOk'));
        //TODO: FETCH FINDINGS
      }
    } catch (error) {
      toast.error(t('err.failedUpdateCustomField'));
      console.error('Error:', error);
    }
  };

  return (
    <div className="">
      {finding ? (
        <div>
          <div className="fixed z-20">
            <Modal
              cancelText={t('btn.cancel')}
              disablehr
              isOpen={openModalDeleteFinding}
              onCancel={() => setOpenModalDeleteFinding(false)}
              onSubmit={confirmDeleteFinding}
              submitText={t('btn.confirm')}
              title={t('msg.deleteFindingConfirm')}
            >
              <span className="ml-3">{t('msg.deleteFindingNotice')}</span>
            </Modal>
          </div>
          <div className="m-4 bg-gray-900 rounded-lg p-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="">{finding.title}</span>
              <div className="flex flex-col gap-4 md:flex-row">
                <PrimaryButton
                  color="red"
                  onClick={() => setOpenModalDeleteFinding(true)}
                >
                  <span>{t('btn.delete')}</span>
                </PrimaryButton>
                <PrimaryButton onClick={submitUpdateFinding}>
                  <span>{t('btn.save')}</span>
                </PrimaryButton>
              </div>
            </div>
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
