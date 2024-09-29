import { useEffect, useState } from 'react';

import CheckboxButton from '../../../../components/button/CheckboxButton';
import DefaultRadioGroup, {
  RadioOption,
} from '../../../../components/button/DefaultRadioGroup';
import Card from '../../../../components/card/Card';
import SimpleInput from '../../../../components/input/SimpleInput';
import RichText from '../../../../components/text/RichText';
import { GetCustomFieldType, OptionData } from '../../../../services/data';

type ListItem = {
  id: number;
  value: string;
  label?: string;
  icon?: string;
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

type CustomFieldProps = {
  currentCustomFields: GetCustomFieldType[];
  setCurrentCustomFields: (fields: GetCustomFieldType[]) => void;
  fetchCustomFields: () => void;
};

export const CustomFieldDisplay: React.FC<CustomFieldProps> = ({
  currentCustomFields,
  setCurrentCustomFields,
  fetchCustomFields,
}) => {
  const optionsList = [
    'checkbox',
    'radio',
    'select',
    'select-multiple',
    'date',
  ];

  const stringList = ['text', 'input', 'radio'];
  const [formData, setFormData] = useState<OptionData>({});

  const handleInputChange = (id: string, value: string) => {
    setFormData((prevData: OptionData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInputChangeText = (id: string, name: string, value: string) => {
    // TODO: Corregir error eslint
    if (stringList.includes(name)) {
      setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
        return prevFields.map((field: GetCustomFieldType) =>
          field._id === id
            ? { ...field, text: [{ locale: 'es-ES', value }] }
            : field,
        );
      });
    }
  };

  const renderField = (field: GetCustomFieldType) => {
    const { _id, fieldType, label, size, offset, required, options, text } =
      field;
    //TODO: Cambiar width
    const sizeStyle = size !== 12 ? `w-${size}/12` : 'w-full';
    if (!optionsList.includes(fieldType)) {
      if (text.length === 0) {
        text.push({ locale: 'es-ES', value: '' });
      }
      //values = options[0].value;
      //values = options[0].value ?? { locale: 'es-ES', value: '' };
    } else if (fieldType === 'date') {
      // TODO: Add custom component
    } else if (fieldType === 'radio') {
      options.map(option =>
        text.push({ locale: 'es-ES', value: option.value }),
      );
    }
    switch (fieldType) {
      case 'checkbox':
        return options.length > 0 ? (
          options.map(option => (
            <div
              className={`flex items-center m-3 ${sizeStyle}`}
              key={option.value}
            >
              <CheckboxButton
                checked={(formData[_id] || {})[option.value] || false}
                onChange={checked => {
                  const currentValues = formData[_id];
                  handleInputChange(_id, {
                    ...currentValues,
                    [option.value]: checked,
                  });
                }}
                text={option.value}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No hay opciones disponibles</p>
        );

      case 'space':
        return <div className="h-20 bg-white mx-4 rounded-lg mt-3" />; // Espacio vertical

      case 'text':
        return (
          <div className={`${sizeStyle}`}>
            <RichText
              label=""
              onChange={(value: string) =>
                handleInputChangeText(_id, fieldType, value)
              }
              placeholder="asd"
              value={text[0].value}
            />
          </div>
        ); // Espacio vertical

      case 'input':
        //TODO: Fix input width 12
        return (
          <div className={`bg-white mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <SimpleInput
              id={_id}
              name={_id}
              onChange={(value: string) =>
                handleInputChangeText(_id, fieldType, value)
              }
              placeholder=""
              type="text"
              value={text[0].value}
            />
          </div>
        ); // Espacio vertical

      case 'radio':
        //TODO: Fix input width 12
        return (
          <div className={`mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <DefaultRadioGroup
              name={_id}
              onChange={(value: string) =>
                handleInputChangeText(_id, fieldType, value)
              }
              options={options.map((option, index) => ({
                id: index.toString(),
                label: option.value,
                value: option.value,
              }))}
              value={text[0].value}
            />
          </div>
        ); // Espacio vertical

      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      <Card title="test">
        <div className="">
          {currentCustomFields.map(
            (field: GetCustomFieldType, index: number) => (
              <div className="bg-gray-700 rounded-lg pb-2" key={field._id}>
                <label
                  className={`block font-medium leading-6 text-gray-300 ml-4 pt-1 ${index !== 0 ? 'mt-4' : ''}`}
                  htmlFor={field._id}
                >
                  {field.fieldType !== 'space' ? field.label : 'space'}
                </label>
                <div>{renderField(field)}</div>
              </div>
            ),
          )}
          {JSON.stringify(currentCustomFields)}
        </div>
      </Card>
    </div>
  );
};
