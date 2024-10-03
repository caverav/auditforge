/* eslint-disable import/extensions */
import { Bars2Icon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DefaultRadioGroup from '@/components/button/DefaultRadioGroup';
import PrimaryButton from '@/components/button/PrimaryButton';
import MultiSelectDropdown from '@/components/dropdown/MultiSelectDropdown';
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
    { id: '1', label: t('default'), value: 'default', disabled: isDisabled },
    { id: '2', label: t('retest'), value: 'retest', disabled: isDisabled },
    { id: '3', label: t('multi'), value: 'multi', disabled: isDisabled },
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
    value: string | boolean | { template: string; locale: string },
  ) => {
    if (field === 'templates' && typeof value === 'object') {
      let temps = rows.find(item => item.name === name)?.templates ?? false;
      /**
       * Si no tiene templates o viene vacío
       */
      if (!temps || temps.length === 0) {
        temps = languageData.map(lang => {
          return { locale: lang.locale, template: '' };
        });
      }

      /**
       * Asigna los nuevos valores a las templates
       */
      const newTemps = temps.map(temp =>
        temp.locale === value.locale ? value : temp,
      );

      setRows(prevRows =>
        prevRows.map(row => {
          return row.name === name ? { ...row, templates: newTemps } : row;
        }),
      );
    } else if (field === 'sections' && typeof value === 'string') {
      /**
       * Arreglo ya que no se puede comprobar que
       * value sea string[] de manera sencilla
       */
      const newSections = JSON.parse(value);
      setRows(prevRows =>
        prevRows.map(row => {
          return row.name === name ? { ...row, sections: newSections } : row;
        }),
      );
    } else if (field === 'name' && typeof value === 'string') {
      /**
       * name en este caso es el _id del row
       */
      name &&
        setRows(prevRows =>
          prevRows.map(row => {
            return row._id === name ? { ...row, name: value } : row;
          }),
        );
    } else {
      setRows(prevRows =>
        prevRows.map(row => {
          return row.name === name ? { ...row, [field]: value } : row;
        }),
      );
    }
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

  const [customSectionsItems, setCustomSectionsItems] = useState<
    {
      id: number;
      value: string;
      label?: string;
    }[]
  >([]);

  useEffect(
    () =>
      setCustomSectionsItems(
        customSectionsData.map((sect, index) => ({
          id: index,
          value: sect.field,
          label: sect.name,
        })),
      ),
    [customSectionsData],
  );

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
                    <div className="pb-4">
                      <SimpleInput
                        disabled={isDisabled}
                        id="name"
                        name="name"
                        onChange={e => handleInputChange(row._id, 'name', e)}
                        placeholder={t('name')}
                        type="text"
                        value={row.name}
                      />
                    </div>
                    <div className="text-lg">{t('auditPhase')}</div>
                    <DefaultRadioGroup
                      name={'stage' + row.name}
                      onChange={e => handleInputChange(row.name, 'stage', e)}
                      options={stageOptions}
                      value={row.stage}
                    />
                    {languageData.map(lang => (
                      <SelectDropdown
                        disabled={isDisabled}
                        items={templateDropdownItems}
                        key={lang.language}
                        onChange={item =>
                          handleInputChange(row.name, 'templates', {
                            template: item.value,
                            locale: lang.locale,
                          })
                        }
                        selected={
                          templateDropdownItems.find(
                            temp =>
                              temp.value ===
                              row.templates.find(t => t.locale === lang.locale)
                                ?.template,
                          ) ?? null
                        }
                        title={`${lang.language} ${t('template')}`}
                      />
                    ))}
                    <MultiSelectDropdown
                      disabled={isDisabled}
                      items={customSectionsItems}
                      onChange={items => {
                        handleInputChange(
                          row.name,
                          'sections',
                          JSON.stringify(items.map(item => item.value)),
                        );
                      }}
                      placeholder={t('customSections')}
                      selected={customSectionsItems.filter(cs =>
                        row.sections.includes(cs.value),
                      )}
                      title={t('customSections')}
                    />
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
    onUpdateList(rows.map(({ id: _, ...rest }) => rest));
  }, [onUpdateList, rows]);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  /**
   * Actualiza las rows si es que cambiaron en el componente padre.
   */
  useEffect(() => {
    setRows(auditTypes.map((row, index) => ({ ...row, id: index.toString() })));
  }, [auditTypes]);

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
