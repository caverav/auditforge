import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import PrimaryButton from '../../../components/button/PrimaryButton';
import {
  addCustomField,
  AddCustomFieldType,
  getLanguages,
} from '../../../services/data';
import { getCategories } from '../../../services/vulnerabilities';
import { CustomFieldType } from './custom-fields/CustomFieldType';
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
  const optionsList = ['checkbox', 'radio', 'select', 'select-multiple'];

  const [displayOptionSeleted, setDisplayOptionSeleted] = useState<ListItem>({
    id: 0,
    label: t('auditGeneral'),
    value: 'general',
  });
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
  const [categorySelected, setCategorySelected] = useState<ListItem | null>(
    null,
  );

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [addOptionField, setAddOptionField] = useState('');
  const [required, setRequired] = useState(false);
  const [requiredSelectComponentAlert, setRequiredSelectComponentAlert] =
    useState(false);
  const [requiredLabelAlert, setRequiredLabelAlert] = useState(false);

  const [languagesList, setLanguagesList] = useState<ListItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<ListItem[]>([]);
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

  const handlerAddField = async () => {
    if (componentOptionSelected === null || label === '') {
      setRequiredSelectComponentAlert(true);
      setRequiredLabelAlert(true);
      return;
    }

    const newCustomField: AddCustomFieldType = {
      label,
      fieldType: componentOptionSelected.value,
      display: displayOptionSeleted.value,
      displaySub: categorySelected?.value ?? '',
      size: Number(sizeSelected.value),
      offset: Number(offsetSelected.value),
      required,
      description,
      text: [],
      options: optionsData,
      position: 10,
    };

    try {
      const response = await addCustomField(newCustomField);
      if (response.status === 'success') {
        //TODO: Add fetchCustomFields
        toast.success(t('msg.customFieldCreatedOk'));
        setLabel('');
        setRequiredSelectComponentAlert(false);
        setRequiredLabelAlert(false);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Custom Field already exists'
      ) {
        toast.error(t('err.customFieldAlreadyExists'));
      } else {
        toast.error(t('err.failedCreateCustomField'));
      }
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CustomFieldType
          categoriesList={categoriesList}
          categorySelected={categorySelected}
          componentOptionSelected={componentOptionSelected}
          displayOptionSeleted={displayOptionSeleted}
          requiredSelectComponentAlert={requiredSelectComponentAlert}
          setCategorySelected={setCategorySelected}
          setComponentOptionSelected={setComponentOptionSelected}
          setDisplayOptionSeleted={setDisplayOptionSeleted}
        />
        <SettingsCustomFields
          componentOptionSelected={componentOptionSelected}
          description={description}
          label={label}
          offsetSelected={offsetSelected}
          required={required}
          requiredLabelAlert={requiredLabelAlert}
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
      <div className="w-full mt-10">
        <PrimaryButton color="blue" onClick={() => handlerAddField()}>
          {
            t('add') //TODO:{t('add') //TODO: add i18n}
          }
        </PrimaryButton>
      </div>
    </div>
  );
};
