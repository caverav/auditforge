// eslint-disable-next-line simple-import-sort/imports
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { t } from 'i18next';

import PrimaryButton from '../../../components/button/PrimaryButton';
import SimpleInput from '../../../components/input/SimpleInput';
import SelectDropdown from '../../../components/dropdown/SelectDropdown';
import Card from '../../../components/card/Card';
import PrimarySwitch from '../../../components/switch/PrimarySwitch';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
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

  const sizes: ListItem[] = [
    { id: 0, label: '0', value: '0' },
    { id: 1, label: '1', value: '1' },
    { id: 2, label: '2', value: '2' },
    { id: 3, label: '3', value: '3' },
    { id: 4, label: '4', value: '4' },
    { id: 5, label: '5', value: '5' },
    { id: 6, label: '6', value: '6' },
    { id: 7, label: '7', value: '7' },
    { id: 8, label: '8', value: '8' },
    { id: 9, label: '9', value: '9' },
    { id: 10, label: '10', value: '10' },
    { id: 11, label: '11', value: '11' },
    { id: 12, label: '12', value: '12' },
  ];

  const [displayOptionSeleted, setDisplayOptionSeleted] = useState<ListItem>(
    cfDisplayOptions[0],
  );
  const [componentOptionSelected, setComponentOptionSelected] =
    useState<ListItem | null>(null);
  const [sectionSelected, setSectionSelected] = useState<ListItem | null>(null);
  const [sizeSelected, setSizeSelected] = useState<ListItem | null>(sizes[12]);
  const [offsetSelected, setOffsetSelected] = useState<ListItem | null>(
    sizes[0],
  );
  const [languageSelected, setLanguageSelected] = useState<ListItem | null>(
    null,
  );

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [addOptionField, setAddOptionField] = useState('');

  const [required, setRequired] = useState(false);

  // TODO: Change to a proper handler
  const handleAddLanguage = () => {
    // eslint-disable-next-line no-console
    console.log('asd');
  };

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
            items={[]}
            onChange={value => setSectionSelected(value)}
            placeholder={t('selectComponent')}
            selected={sectionSelected}
            title={t('selectSection')}
          />
        ) : (
          <div className="h-11" />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 content-start">
        <SimpleInput
          id="label"
          label={t('label')}
          name="label"
          onChange={setLabel}
          placeholder={t('label')}
          type="text"
          value={label}
        />
        <SimpleInput
          id="description"
          label={t('description')}
          name="description"
          onChange={setDescription}
          placeholder={t('description')}
          type="text"
          value={description}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectDropdown
            items={sizes}
            onChange={value => setSizeSelected(value)}
            selected={sizeSelected}
            title={t('size')}
          />
          <SelectDropdown
            items={sizes}
            onChange={value => setOffsetSelected(value)}
            selected={offsetSelected}
            title={t('offset')}
          />
        </div>
        <PrimarySwitch
          enabled={required}
          label={t('required')}
          onChange={setRequired}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 content-start">
        <SelectDropdown
          items={[]}
          onChange={value => setLanguageSelected(value)}
          selected={languageSelected}
          title={t('optionsLanguage')}
        />
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <SimpleInput
              id="addOption"
              label={t('addOption')}
              name="addOption"
              onChange={setAddOptionField}
              placeholder={t('addOption')}
              type="text"
              value={addOptionField}
            />
          </div>
          <div className="flex-shrink-0">
            <PrimaryButton onClick={handleAddLanguage}>+</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
