import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import PrimaryButton from '../../../../../components/button/PrimaryButton';
import SelectDropdown from '../../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../../components/input/SimpleInput';
import PrimarySwitch from '../../../../../components/switch/PrimarySwitch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../components/ui/popover';
import { GetCustomFieldType } from '../../../../../services/data';

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

type PopOverProps = {
  currentCustomField: GetCustomFieldType;
  setCurrentCustomFields: React.Dispatch<
    React.SetStateAction<GetCustomFieldType[]>
  >;
  currentLanguage: string;
};

const optionsList = ['checkbox', 'radio', 'select', 'select-multiple'];
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

export const PopOverEditCustomField: React.FC<PopOverProps> = ({
  currentCustomField,
  currentLanguage,
  setCurrentCustomFields,
}) => {
  const [addOptionField, setAddOptionField] = useState('');
  const [required, setRequired] = useState(currentCustomField.required);
  const [sizeSelected, setSizeSelected] = useState<ListItem>(
    sizes.find(item => item.id === currentCustomField.size) ?? sizes[1],
  );

  const [offsetSelected, setOffsetSelected] = useState<ListItem>(
    sizes.find(item => item.id === currentCustomField.offset) ?? sizes[0],
  );

  const [optionsData, setOptionsData] = useState<OptionData[]>(
    currentCustomField.options,
  );

  const handlerTextChange = (name: string, value: string) => {
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === currentCustomField._id
          ? {
              ...field,
              [name]: value,
            }
          : field,
      );
    });
  };

  const handlerDropdownChange = (name: string, value: ListItem) => {
    name === 'size' ? setSizeSelected(value) : setOffsetSelected(value);
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === currentCustomField._id
          ? {
              ...field,
              [name]: value.id,
            }
          : field,
      );
    });
  };

  const handlerAddOption = () => {
    if (!addOptionField.trim()) {
      return;
    }
    const newOptions = [
      ...optionsData,
      { locale: currentLanguage, value: addOptionField },
    ];
    setOptionsData(newOptions);
    setAddOptionField('');
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === currentCustomField._id
          ? {
              ...field,
              options: newOptions,
            }
          : field,
      );
    });
  };

  const handlerDeleteOption = (index: number) => {
    const newOptions = [...optionsData];
    const removedOption = newOptions.splice(index, 1);
    setOptionsData(newOptions);

    setCurrentCustomFields((prevFields: GetCustomFieldType[]) =>
      prevFields.map((field: GetCustomFieldType) =>
        field._id === currentCustomField._id
          ? {
              ...field,
              options: newOptions,
              text: field.text.map(({ locale, value }) => ({
                locale,
                value: Array.isArray(value)
                  ? value.filter(v => v !== removedOption[0].value)
                  : value === removedOption[0].value
                    ? ''
                    : value,
              })),
            }
          : field,
      ),
    );
  };

  useEffect(() => {
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === currentCustomField._id
          ? {
              ...field,
              required,
            }
          : field,
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentCustomFields]);

  return (
    <div>
      <Popover>
        <PopoverTrigger className="flex h-10">
          <PrimaryButton color="blue">
            <PencilSquareIcon className="h-5 w-5" />
          </PrimaryButton>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-700">
          <div className="text-white flex flex-col">
            {currentCustomField.fieldType !== 'space' ? (
              <div>
                <SimpleInput
                  id="labelEdit"
                  label={t('label')}
                  name="labelEdit"
                  onChange={value => handlerTextChange('label', value)}
                  placeholder=""
                  type="text"
                  value={currentCustomField.label}
                />
                <span className="mt-4" />
                <SimpleInput
                  id="descriptionEdit"
                  label={t('description')}
                  name="descriptionEdit"
                  onChange={value => handlerTextChange('description', value)}
                  placeholder=""
                  type="text"
                  value={currentCustomField.description}
                />
              </div>
            ) : null}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectDropdown
                items={sizes.slice(1)}
                onChange={value => handlerDropdownChange('size', value)}
                selected={sizeSelected}
                title={t('size')}
              />
              <SelectDropdown
                items={sizes}
                onChange={value => handlerDropdownChange('offset', value)}
                selected={offsetSelected}
                title={t('offset')}
              />
            </div>
            {currentCustomField.fieldType !== 'space' ? (
              <div className="mt-4 flex justify-center text-gray-300">
                <PrimarySwitch
                  enabled={required}
                  label={t('required')}
                  onChange={setRequired}
                />
              </div>
            ) : null}
            {optionsList.includes(currentCustomField.fieldType) ? (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                    <PrimaryButton onClick={handlerAddOption}>+</PrimaryButton>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg">
                  {optionsData.map((option, index) => (
                    <div
                      className={`flex items-center gap-2 ${index !== 0 ? 'border-t-gray-600 border-t' : ''}`}
                      key={`${option.locale}-${index}`}
                    >
                      <div className="flex-grow mx-2">{option.value}</div>
                      <div className="flex-shrink-0 p-1">
                        <PrimaryButton
                          color="red"
                          onClick={() => handlerDeleteOption(index)}
                        >
                          <span aria-hidden="true">×</span>
                        </PrimaryButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
