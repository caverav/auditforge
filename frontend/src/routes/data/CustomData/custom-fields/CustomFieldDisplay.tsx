import { useState } from 'react';

import CheckboxButton from '../../../../components/button/CheckboxButton';
import DefaultRadioGroup from '../../../../components/button/DefaultRadioGroup';
import Card from '../../../../components/card/Card';
import SimpleInput from '../../../../components/input/SimpleInput';
import RichText from '../../../../components/text/RichText';
import { GetCustomFieldType, OptionData } from '../../../../services/data';
import {
  DayPickerCustom,
  MultiSelectDropdownCustom,
  SelectDropdownCustom,
} from './customComponents';
import CheckboxButtonCustom from './customComponents/CheckboxButton';

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
    //TODO: Change text added by default
    if (stringList.includes(fieldType)) {
      if (text.length === 0) {
        text.push({ locale: 'es-ES', value: '' });
      }
      //values = options[0].value;
      //values = options[0].value ?? { locale: 'es-ES', value: '' };
    }

    switch (fieldType) {
      case 'checkbox':
        return (
          <div className={`mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <CheckboxButtonCustom
              id={_id}
              options={options.map(option => option.value)}
              setCurrentCustomFields={setCurrentCustomFields}
              text={
                Array.isArray(text[0].value) ? text[0].value : [text[0].value]
              }
            />
          </div>
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
              value={
                Array.isArray(text[0].value) ? text[0].value[0] : text[0].value
              }
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
              // value={text[0].value}
              value={
                Array.isArray(text[0].value) ? text[0].value[0] : text[0].value
              }
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
              // value={text[0].value}
              value={
                Array.isArray(text[0].value) ? text[0].value[0] : text[0].value
              }
            />
          </div>
        );

      case 'select':
        //TODO: Fix input width 12
        return (
          <div className={`mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <SelectDropdownCustom
              id={_id}
              items={options.map((option, index) => ({
                id: index,
                value: option.value,
                label: option.value,
              }))}
              placeholder="Select"
              setCurrentCustomFields={setCurrentCustomFields}
              title=""
            />
          </div>
        );

      case 'select-multiple':
        //TODO: Fix input width 12
        return (
          <div className={`mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <MultiSelectDropdownCustom
              id={_id}
              items={options.map((option, index) => ({
                id: index,
                value: option.value,
                label: option.value,
              }))}
              placeholder="Select"
              setCurrentCustomFields={setCurrentCustomFields}
              title=""
            />
          </div>
        );

      case 'date':
        //TODO: Fix input width 12
        return (
          <div className={`mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <DayPickerCustom
              id={_id}
              setCurrentCustomFields={setCurrentCustomFields}
              label=""
            />
          </div>
        );

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
