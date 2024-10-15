import { t } from 'i18next';

import SelectDropdown from '../../../../components/dropdown/SelectDropdown';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
};

type CustomFieldTypeProps = {
  displayOptionSelected: ListItem;
  customSectionsList: ListItem[];
  setDisplayOptionSelected: (value: ListItem) => void;
  componentOptionSelected: ListItem | null;
  setComponentOptionSelected: (value: ListItem) => void;
  categorySelected: ListItem | null;
  setCategorySelected: (value: ListItem | null) => void;
  categoriesList: ListItem[];
  requiredSelectComponentAlert: boolean;
};

export const CustomFieldType: React.FC<CustomFieldTypeProps> = ({
  displayOptionSelected,
  customSectionsList,
  setDisplayOptionSelected,
  componentOptionSelected,
  setComponentOptionSelected,
  categorySelected,
  setCategorySelected,
  categoriesList,
  requiredSelectComponentAlert,
}) => {
  const cfDisplayOptions: ListItem[] = [
    { id: 1, label: t('auditGeneral'), value: 'general' },
    { id: 2, label: t('auditFinding'), value: 'finding' },
    { id: 3, label: t('auditSection'), value: 'section' },
    { id: 4, label: t('vulnerability'), value: 'vulnerability' },
  ];

  const cfComponentOptions: ListItem[] = [
    { id: 1, label: t('checkbox'), value: 'checkbox', icon: 'check_box' },
    { id: 2, label: t('date'), value: 'date', icon: 'event' },
    { id: 3, label: t('editor'), value: 'text', icon: 'mdi-format-pilcrow' },
    { id: 4, label: t('input'), value: 'input', icon: 'title' },
    { id: 5, label: t('radio'), value: 'radio', icon: 'radio_button_checked' },
    {
      id: 6,
      label: t('select'),
      value: 'select',
      icon: 'far fa-caret-square-down',
    },
    {
      id: 7,
      label: t('selectMultiple'),
      value: 'select-multiple',
      icon: 'filter_none',
    },
    { id: 8, label: t('space'), value: 'space', icon: 'space_bar' },
  ];

  const onChangeDisplayOption = (value: ListItem) => {
    setDisplayOptionSelected(value);
    setCategorySelected(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 content-start">
      <SelectDropdown
        items={cfDisplayOptions}
        onChange={onChangeDisplayOption}
        selected={displayOptionSelected}
        title={t('selectView')}
      />
      <SelectDropdown
        items={cfComponentOptions}
        onChange={setComponentOptionSelected}
        placeholder={t('selectComponent')}
        requiredAlert={requiredSelectComponentAlert}
        requiredField
        selected={componentOptionSelected}
        title={t('selectComponent')}
      />
      {displayOptionSelected.value !== 'general' ? (
        <SelectDropdown
          items={
            displayOptionSelected.value === 'section'
              ? customSectionsList
              : categoriesList
          }
          onChange={setCategorySelected}
          placeholder={
            displayOptionSelected.value === 'section'
              ? t('selectSection')
              : t('selectCategory')
          }
          selected={categorySelected}
          title={
            displayOptionSelected.value === 'section'
              ? t('selectSection')
              : t('selectCategory')
          }
        />
      ) : (
        <div className="h-11" />
      )}
    </div>
  );
};
