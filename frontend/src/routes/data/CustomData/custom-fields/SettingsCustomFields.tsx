import { t } from 'i18next';

import SelectDropdown from '../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../components/input/SimpleInput';
import PrimarySwitch from '../../../../components/switch/PrimarySwitch';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
};

type SettingsCustomFieldsProps = {
  componentOptionSelected: ListItem | null;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  sizeSelected: ListItem;
  setSizeSelected: (value: ListItem) => void;
  offsetSelected: ListItem;
  setOffsetSelected: (value: ListItem) => void;
  required: boolean;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
  requiredLabelAlert: boolean;
};

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

export const SettingsCustomFields: React.FC<SettingsCustomFieldsProps> = ({
  componentOptionSelected,
  label,
  setLabel,
  description,
  setDescription,
  sizeSelected,
  setSizeSelected,
  offsetSelected,
  setOffsetSelected,
  required,
  setRequired,
  requiredLabelAlert,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 content-start">
      {componentOptionSelected?.value !== 'space' ? (
        <div>
          <SimpleInput
            id="label"
            label={t('label')}
            name="label"
            onChange={setLabel}
            placeholder={t('label')}
            requiredAlert={requiredLabelAlert}
            requiredField
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
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectDropdown
          items={sizes.slice(1)}
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
      <div>
        {componentOptionSelected?.value !== 'space' ? (
          <PrimarySwitch
            enabled={required}
            label={t('required')}
            onChange={setRequired}
          />
        ) : null}
      </div>
    </div>
  );
};
