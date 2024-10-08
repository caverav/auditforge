import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import PrimaryButton from '../../../components/button/PrimaryButton';
import Card from '../../../components/card/Card';
import {
  addCustomField,
  AddCustomFieldType,
  getCustomField,
  GetCustomFieldType,
  getCustomSections,
  getLanguages,
} from '../../../services/data';
import { getCategories } from '../../../services/vulnerabilities';
import {
  CustomFieldDisplay,
  CustomFieldType,
  OptionsCustomData,
  SettingsCustomFields,
} from './custom-fields/';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
};

type CustomSectionFields = {
  field: string;
  name: string;
  icon: string;
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
  const [customSectionsList, setCustomSectionsList] = useState<ListItem[]>([]);

  const [currentCustomFields, setCurrentCustomFields] = useState<
    GetCustomFieldType[]
  >([]);

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

  const fetchCustomFields = async () => {
    try {
      const dataCustomFields = await getCustomField();
      setCurrentCustomFields(dataCustomFields.datas);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCustomSections = async () => {
    try {
      const dataCustomFields = await getCustomSections();
      const customSectionsNames = dataCustomFields.datas.map(
        (item: CustomSectionFields, index: number) => ({
          id: index + 1,
          value: item.name,
          label: item.name,
        }),
      );
      setCustomSectionsList(customSectionsNames);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    void fetchLanguages();
    void fetchCategories();
    void fetchCustomFields();
    void fetchCustomSections();
  }, []);

  const handlerAddField = async () => {
    if (
      componentOptionSelected === null ||
      (label === '' && componentOptionSelected.value !== 'space')
    ) {
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
      position: currentCustomFields.length + 1,
    };

    try {
      const response = await addCustomField(newCustomField);
      if (response.status === 'success') {
        toast.success(t('msg.customFieldCreatedOk'));
        setLabel('');
        setRequiredSelectComponentAlert(false);
        setRequiredLabelAlert(false);
        setAddOptionField('');
        setOptionsData([]);
        void fetchCustomFields();
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
      <Card title={t('createAndManageCustomFields')}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CustomFieldType
              categoriesList={categoriesList}
              categorySelected={categorySelected}
              componentOptionSelected={componentOptionSelected}
              customSectionsList={customSectionsList}
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
              {t('btn.add')}
            </PrimaryButton>
          </div>
        </div>
      </Card>
      {currentCustomFields.length > 0 ? (
        <CustomFieldDisplay
          currentCustomFields={currentCustomFields}
          displayOptionSeleted={displayOptionSeleted}
          fetchCustomFields={fetchCustomFields}
          languagesList={languagesList}
          setCurrentCustomFields={setCurrentCustomFields}
        />
      ) : null}
    </div>
  );
};
