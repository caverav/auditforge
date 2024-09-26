import { t } from 'i18next';

import SelectDropdown from '../../../../components/dropdown/SelectDropdown';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
};

type CustomFieldTypeProps = {
  displayOptionSeleted: ListItem;
  setDisplayOptionSeleted: (value: ListItem) => void;
  componentOptionSelected: ListItem | null;
  setComponentOptionSelected: (value: ListItem) => void;
  categorySelected: ListItem | null;
  setCategorySelected: (value: ListItem) => void;
  categoriesList: ListItem[];
};

export const CustomFieldType: React.FC<CustomFieldTypeProps> = ({
  displayOptionSeleted,
  setDisplayOptionSeleted,
  componentOptionSelected,
  setComponentOptionSelected,
  categorySelected,
  setCategorySelected,
  categoriesList,
}) => {
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

  return (
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
  );
};
