// eslint-disable-next-line simple-import-sort/imports
import { useEffect, useState } from 'react';
import { t } from 'i18next';

import SelectDropdown from '../../../components/dropdown/SelectDropdown';
import { getLanguages } from '../../../services/data';
import { getCategories } from '../../../services/vulnerabilities';
import { OptionsCustomData } from './custom-fields/OptionsCustomData';
import { SettingsCustomFields } from './custom-fields/SettingsCustomFields';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
};

type OptionData = {
  locale: string;
  value: string;
};

type LanguageData = {
  language: string;
  locale: string;
};

type CategoryData = {
  _id: string;
  name: string;
  sortValue: string;
  sortOrder: string;
  sortAuto: boolean;
};

export const CustomFields: React.FC = () => {
  const cfDisplayOptions: ListItem[] = [
    { id: 0, label: t('auditGeneral'), value: 'general' },
    { id: 1, label: t('auditFinding'), value: 'finding' },
    { id: 2, label: t('auditSection'), value: 'section' },
    { id: 3, label: t('vulnerability'), value: 'vulnerability' },
  ];

  const cfComponentOptions: ListItem[] = [
    { id: 0, label: t('checkbox'), value: 'checkbox', icon: 'check_box' },
    { id: 1, label: t('date'), value: 'date', icon: 'event' },
    { id: 2, label: t('editor'), value: 'text', icon: 'mdi-format-pilcrow' },
    { id: 3, label: t('input'), value: 'input', icon: 'title' },
    { id: 4, label: t('radio'), value: 'radio', icon: 'radio_button_checked' },
    {
      id: 5,
      label: t('select'),
      value: 'select',
      icon: 'far fa-caret-square-down',
    },
    {
      id: 6,
      label: t('selectMultiple'),
      value: 'select-multiple',
      icon: 'filter_none',
    },
    { id: 7, label: t('space'), value: 'space', icon: 'space_bar' },
  ];

  const optionsList = ['checkbox', 'radio', 'select', 'select-multiple'];

  const [displayOptionSeleted, setDisplayOptionSeleted] = useState<ListItem>(
    cfDisplayOptions[0],
  );
  const [componentOptionSelected, setComponentOptionSelected] =
    useState<ListItem | null>(null);
  const [sizeSelected, setSizeSelected] = useState<ListItem>({
    id: 12,
    label: '12',
    value: '12',
  });
  const [offsetSelected, setOffsetSelected] = useState<ListItem>({
    id: 0,
    label: '0',
    value: '0',
  });

  const [languageSelected, setLanguageSelected] = useState<ListItem | null>(
    null,
  );
  const [languagesList, setLanguagesList] = useState<ListItem[]>([]);

  const [categorySelected, setCategorySelected] = useState<ListItem | null>(
    null,
  );
  const [categoriesList, setCategoriesList] = useState<ListItem[]>([]);

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [addOptionField, setAddOptionField] = useState('');

  const [required, setRequired] = useState(false);

  const [optionsData, setOptionsData] = useState<OptionData[]>([]);

  // Fetch
  const fetchLanguages = async () => {
    try {
      const dataLanguage = await getLanguages();
      const languageNames = dataLanguage.datas.map(
        (item: LanguageData, index: number) => ({
          id: index,
          value: item.locale,
          label: item.language,
        }),
      );
      setLanguagesList(languageNames);
      setLanguageSelected(languageNames[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const dataCategory = await getCategories();
      const categoryNames = dataCategory.datas.map(
        (item: CategoryData, index: number) => ({
          id: index + 1,
          value: item.name,
          label: item.name,
        }),
      );
      setCategoriesList([...categoryNames]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    void fetchLanguages();
    void fetchCategories();
  }, []);

  /*
  const handlerAddField = () => {
    // eslint-disable-next-line no-console
    console.log('Added Field');
    // eslint-disable-next-line no-console
    console.log(optionsData);
  };
  */

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 content-start">
        <SelectDropdown
          items={cfDisplayOptions}
          onChange={value => setDisplayOptionSeleted(value)}
          selected={displayOptionSeleted}
          title={t('selectView')}
        />
        <SelectDropdown
          items={cfComponentOptions}
          onChange={value => setComponentOptionSelected(value)}
          placeholder={t('selectComponent')}
          selected={componentOptionSelected}
          title={t('selectComponent')}
        />
        {displayOptionSeleted.value !== 'general' ? (
          <SelectDropdown
            items={categoriesList}
            onChange={value => setCategorySelected(value)}
            placeholder={t('selectCategory')}
            selected={categorySelected}
            title={t('selectCategory')}
          />
        ) : (
          <div className="h-11" />
        )}
      </div>
      <SettingsCustomFields
        componentOptionSelected={componentOptionSelected}
        description={description}
        label={label}
        offsetSelected={offsetSelected}
        required={required}
        setDescription={setDescription}
        setLabel={setLabel}
        setOffsetSelected={setOffsetSelected}
        setRequired={setRequired}
        setSizeSelected={setSizeSelected}
        sizeSelected={sizeSelected}
      />
      {optionsList.includes(componentOptionSelected?.value ?? '') ? (
        <OptionsCustomData
          addOptionField={addOptionField}
          languageSelected={languageSelected}
          languagesList={languagesList}
          optionsData={optionsData}
          setAddOptionField={setAddOptionField}
          setLanguageSelected={setLanguageSelected}
          setOptionsData={setOptionsData}
        />
      ) : null}
    </div>
  );
};
