/* eslint-disable import/extensions */
import { Bars2Icon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DefaultRadioGroup from '@/components/button/DefaultRadioGroup';
import PrimaryButton from '@/components/button/PrimaryButton';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import SimpleInput from '@/components/input/SimpleInput';
import {
  getLanguages,
  getTemplates,
  Language,
  Template,
} from '@/services/audits';

import DraggableList from '../../../components/table/DraggableTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { AuditType, getCustomSections } from '../../../services/data';

type AuditTypeListProps = {
  auditTypes: AuditType[];
  isDisabled: boolean;
  onUpdateList: (data: AuditType[]) => void;
};

export const AuditTypeList: React.FC<AuditTypeListProps> = ({
  auditTypes,
  isDisabled,
  onUpdateList,
}) => {
  const { t } = useTranslation();

  const stageOptions = [
    { id: '1', label: t('default'), value: 'default' },
    { id: '2', label: t('retest'), value: 'retest' },
    { id: '3', label: t('multi'), value: 'multi' },
  ];

  /**
   * Datos base
   */

  const [templateData, setTemplateData] = useState<Template[]>([]);
  const [customSectionsData, setCustomSectionsData] = useState<
    { field: string; name: string; icon: string }[]
  >([]);
  const [languageData, setLanguageData] = useState<Language[]>([]);

  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoadingTemplates(true);

      try {
        const data = await getTemplates();
        setTemplateData(data.datas);
        setLoadingTemplates(false);
      } catch (err) {
        setError('Error fetching templates');
        setLoadingTemplates(false);
      }
    };

    void fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      setLoadingSections(true);

      try {
        const data = await getCustomSections();
        setCustomSectionsData(data.datas);
        setLoadingSections(false);
      } catch (err) {
        setError('Error fetching sections');
        setLoadingSections(false);
      }
    };

    void fetchSections();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      setLoadingTemplates(true);

      try {
        const data = await getLanguages();
        setLanguageData(data.datas);
        setLoadingLanguages(false);
      } catch (err) {
        setError('Error fetching languages');
        setLoadingLanguages(false);
      }
    };

    void fetchLanguages();
  }, []);

  const [rows, setRows] = useState<
    {
      _id: string;
      name: string;
      hidden: string[];
      sections: string[];
      stage: string;
      templates: { template: string; locale: string }[];
      id: string;
    }[]
  >(auditTypes.map((row, index) => ({ ...row, id: index.toString() })));

  const handleInputChange = (
    name: string,
    field: keyof AuditType,
    value: string | boolean | object,
  ) => {
    setRows(prevRows =>
      prevRows.map(row => {
        return row.name === name ? { ...row, [field]: value } : row;
      }),
    );
  };

  const handleRemoveRow = (name: string) => {
    setRows(rows.filter(row => row.name !== name));
  };

  /**
   * Mapea las templates a ListItem
   */
  const [templateDropdownItems, setTemplateDropdownItems] = useState<
    { id: number; label: string; value: string }[]
  >([]);
  useEffect(() => {
    setTemplateDropdownItems(
      templateData.map((template, index) => ({
        id: index,
        label: template.name,
        value: template._id,
      })),
    );
  }, [templateData]);

  const renderRow = (row: AuditType) => (
    <div
      className={
        isDisabled
          ? 'flex flex-col-3 items-center justify-center'
          : 'flex flex-col-1 items-center justify-center'
      }
    >
      {!isDisabled ? (
        <div className="basis-1/4 flex flex-col items-center">
          <Bars2Icon className="size-4" />
        </div>
      ) : null}
      <div className="basis-full overflow-hidden">
        <Accordion collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>{row.name}</AccordionTrigger>
            <AccordionContent>
              <div className="p-1">
                {loadingTemplates && loadingSections && loadingLanguages ? (
                  <p>{t('loading')}</p>
                ) : (
                  <>
                    <div className="text-lg">{t('auditPhase')}</div>
                    <DefaultRadioGroup
                      name={'stage' + row.name}
                      onChange={e => handleInputChange(row.name, 'stage', e)}
                      options={stageOptions}
                      value={row.stage}
                    />
                    <SimpleInput
                      id="name"
                      name="name"
                      onChange={e => handleInputChange(row.name, 'name', e)}
                      placeholder={t('name')}
                      type="text"
                      value={row.name}
                    />
                    {languageData.map(lang => (
                      <SelectDropdown
                        items={templateDropdownItems}
                        key={lang.language}
                        onChange={item =>
                          handleInputChange(row._id, 'templates', [
                            ...row.templates,
                            {
                              template: item.value,
                              locale: lang.locale,
                            },
                          ])
                        }
                        selected={
                          templateDropdownItems.find(
                            item =>
                              item.value ===
                              row.templates.find(
                                temp => temp.template === item.value,
                              )?.template,
                          ) ?? null
                        }
                        title={`${lang.language} ${t('template')}`}
                      />
                    ))}
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {!isDisabled ? (
        <div className="basis-1/4 flex flex-col items-center">
          <PrimaryButton color="red" onClick={() => handleRemoveRow(row.name)}>
            X
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );

  /**
   * Le "avisa" al componente padre
   * que cambió la lista.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdateList(rows.map(({ id, ...rest }) => rest));
  }, [onUpdateList, rows]);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return (
    <div>
      <DraggableList
        isDisabled={isDisabled}
        items={rows}
        onOrderChange={setRows}
        renderItem={renderRow}
      />
    </div>
  );
};
