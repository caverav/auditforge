/* eslint-disable import/extensions */
import { t } from 'i18next';

import DefaultRadioGroup from '@/components/button/DefaultRadioGroup';
import SimpleInput from '@/components/input/SimpleInput';
import RichText from '@/components/text/RichText';
import {
  CheckboxButtonCustom,
  DayPickerCustom,
  MultiSelectDropdownCustom,
  SelectDropdownCustom,
} from '@/routes/data/CustomData/custom-fields/customComponents';

type TransformedField = {
  description: string;
  display: string;
  displaySub: string;
  fieldType: string;
  label: string;
  offset: number;
  text: {
    locale: string;
    value: string;
  }[];
  options: {
    locale: string;
    value: string;
  }[];
  required: boolean;
  size: number;
  _id: string;
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type AuditCustomFieldsProps = {
  fields: TransformedField[];
  currentLanguage: ListItem;
  // es necesaria una refactorización de los componentes
  // se hará un issue al respecto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentCustomFields: (fields: any) => void;
  onSave: () => void;
};

const AuditCustomFields: React.FC<AuditCustomFieldsProps> = ({
  fields,
  currentLanguage,
  setCurrentCustomFields,
  onSave,
}) => {
  const handlerInputChangeText = (id: string, value: string) => {
    setCurrentCustomFields((prevFields: TransformedField[]) => {
      return prevFields.map((field: TransformedField) =>
        field._id === id
          ? {
              ...field,
              text: field.text.map(item =>
                item.locale === currentLanguage.value
                  ? { locale: item.locale, value }
                  : item,
              ),
            }
          : field,
      );
    });
  };

  const handlerTextString = (
    text: { locale: string; value: string | string[] }[],
  ) => {
    return Array.isArray(text[0].value) ? text[0].value[0] : text[0].value;
  };

  const handlerTextArray = (
    text: {
      locale: string;
      value: string | string[];
    }[],
  ) => {
    return text
      .filter(item => item.locale === currentLanguage.value)
      .flatMap(item => (Array.isArray(item.value) ? item.value : [item.value]));
  };

  return (
    <div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-600 text-white rounded-md px-4 py-2"
          onClick={onSave}
          type="button"
        >
          {t('btn.save')}
        </button>
      </div>
      {fields.map(customField => {
        const { _id, fieldType, size, offset, options, label, text } =
          customField;
        const validSize = Math.min(12, Math.max(0, size));
        const sizeStyle =
          validSize > 0
            ? Math.round((validSize / 12) * 100)
            : Math.round((1 / 12) * 100);

        return (
          <div
            className="bg-[#101827] shadow-md rounded-lg p-4 my-4"
            key={_id}
            style={{ width: '100%' }}
          >
            <span className="block font-medium leading-6 text-white-600">
              {label}
            </span>
            <span className="block font-medium leading-6 text-white-600">
              {t('offset')}: {offset}
            </span>

            <div className="mt-4" style={{ width: `calc(${sizeStyle}%)` }}>
              {(() => {
                switch (fieldType) {
                  case 'checkbox':
                    return (
                      <CheckboxButtonCustom
                        currentLanguage={currentLanguage.value}
                        id={_id}
                        options={options.map(option => option.value)}
                        setCurrentCustomFields={setCurrentCustomFields}
                        text={handlerTextArray(text)}
                      />
                    );

                  case 'space':
                    return (
                      <div className="bg-white w-full rounded-lg mt-1 h-28" />
                    );

                  case 'text':
                    return (
                      <RichText
                        label=""
                        onChange={(value: string) =>
                          handlerInputChangeText(_id, value)
                        }
                        placeholder=""
                        value={handlerTextString(text)}
                      />
                    );

                  case 'input':
                    return (
                      <SimpleInput
                        id={_id}
                        name={_id}
                        onChange={(value: string) =>
                          handlerInputChangeText(_id, value)
                        }
                        placeholder=""
                        type="text"
                        value={handlerTextString(text)}
                      />
                    );

                  case 'radio':
                    return (
                      <DefaultRadioGroup
                        name={_id}
                        onChange={(value: string) =>
                          handlerInputChangeText(_id, value)
                        }
                        options={options.map((option, index) => ({
                          id: index.toString(),
                          label: option.value,
                          value: option.value,
                        }))}
                        value={handlerTextString(text)}
                      />
                    );

                  case 'select':
                    return (
                      <SelectDropdownCustom
                        currentLanguage={currentLanguage.value}
                        id={_id}
                        items={options.map((option, index) => ({
                          id: index,
                          value: option.value,
                          label: option.value,
                        }))}
                        placeholder="Select"
                        setCurrentCustomFields={setCurrentCustomFields}
                        text={handlerTextString(text)}
                        title=""
                      />
                    );

                  case 'select-multiple':
                    return (
                      <MultiSelectDropdownCustom
                        currentLanguage={currentLanguage.value}
                        id={_id}
                        items={options.map((option, index) => ({
                          id: index,
                          value: option.value,
                          label: option.value,
                        }))}
                        placeholder="Select"
                        setCurrentCustomFields={setCurrentCustomFields}
                        text={handlerTextArray(text)}
                        title=""
                      />
                    );

                  case 'date':
                    return (
                      <DayPickerCustom
                        currentLanguage={currentLanguage.value}
                        id={_id}
                        label=""
                        setCurrentCustomFields={setCurrentCustomFields}
                        text={handlerTextString(text)}
                      />
                    );

                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuditCustomFields;
