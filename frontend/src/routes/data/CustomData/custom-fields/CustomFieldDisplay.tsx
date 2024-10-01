import { t } from 'i18next';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

import DefaultRadioGroup from '../../../../components/button/DefaultRadioGroup';
import PrimaryButton from '../../../../components/button/PrimaryButton';
import Card from '../../../../components/card/Card';
import SimpleInput from '../../../../components/input/SimpleInput';
import Modal from '../../../../components/modal/Modal';
import RichText from '../../../../components/text/RichText';
import {
  deleteCustomField,
  GetCustomFieldType,
} from '../../../../services/data';
import {
  CheckboxButtonCustom,
  DayPickerCustom,
  MultiSelectDropdownCustom,
  SelectDropdownCustom,
} from './customComponents';

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
  const stringList = ['text', 'input', 'radio', 'date'];
  const [deletedCustomField, setDeletedCustomField] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deletedCustomFieldId, setDeletedCustomFieldId] = useState<string>('');

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
    // const { _id, fieldType, label, size, offset, required, options, text } =
    const { _id, fieldType, size, options, text } = field;
    //TODO: Cambiar width
    const sizeStyle = size !== 12 ? `w-${size}/12` : 'w-full';
    //TODO: Change text added by default
    if (text.length === 0) {
      if (stringList.includes(fieldType)) {
        text.push({ locale: 'es-ES', value: '' });
      } else if (
        fieldType === 'checkbox' ||
        fieldType === 'select-multiple' ||
        fieldType === 'select'
      ) {
        text.push({ locale: 'es-ES', value: [] });
      }
    }

    switch (fieldType) {
      case 'checkbox':
        return (
          <div className={`mx-4 rounded-lg mt-3 ${sizeStyle}`}>
            <CheckboxButtonCustom
              id={_id}
              options={options.map(option => option.value)}
              setCurrentCustomFields={setCurrentCustomFields}
              /* text={
                Array.isArray(text[0].value) ? text[0].value : [text[0].value]
              } */
              text={
                Array.isArray(text[0].value)
                  ? text[0].value
                  : typeof text[0].value === 'object'
                    ? Array.isArray(text[0].value.value)
                      ? text[0].value.value
                      : [text[0].value.value]
                    : [text[0].value]
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
              /* value={
                Array.isArray(text[0].value) ? text[0].value[0] : text[0].value
              } */
              value={
                Array.isArray(text[0].value)
                  ? text[0].value[0]
                  : typeof text[0].value === 'object'
                    ? Array.isArray(text[0].value.value)
                      ? text[0].value.value[0]
                      : text[0].value.value
                    : text[0].value
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
              /* value={
                Array.isArray(text[0].value) ? text[0].value[0] : text[0].value
              } */
              value={
                Array.isArray(text[0].value)
                  ? text[0].value[0]
                  : typeof text[0].value === 'object'
                    ? Array.isArray(text[0].value.value)
                      ? text[0].value.value[0]
                      : text[0].value.value
                    : text[0].value
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
                Array.isArray(text[0].value)
                  ? text[0].value[0]
                  : typeof text[0].value === 'object'
                    ? Array.isArray(text[0].value.value)
                      ? text[0].value.value[0]
                      : text[0].value.value
                    : text[0].value
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
              text={
                typeof text[0].value === 'object' && 'locale' in text[0].value
                  ? {
                      locale: text[0].value.locale,
                      value: Array.isArray(text[0].value.value)
                        ? text[0].value.value
                        : [text[0].value.value],
                    }
                  : {
                      locale: text[0].locale,
                      value: Array.isArray(text[0].value)
                        ? text[0].value
                        : [text[0].value],
                    }
              }
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
              text={
                typeof text[0].value === 'object' && 'locale' in text[0].value
                  ? {
                      locale: text[0].value.locale,
                      value: Array.isArray(text[0].value.value)
                        ? text[0].value.value
                        : [text[0].value.value],
                    }
                  : {
                      locale: text[0].locale,
                      value: Array.isArray(text[0].value)
                        ? text[0].value
                        : [text[0].value],
                    }
              }
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
              label=""
              setCurrentCustomFields={setCurrentCustomFields}
              text={
                Array.isArray(text[0].value)
                  ? text[0].value[0]
                  : typeof text[0].value === 'object'
                    ? Array.isArray(text[0].value.value)
                      ? text[0].value.value[0]
                      : text[0].value.value
                    : text[0].value
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  const confirmDeleteCustomField = async () => {
    try {
      const response = await deleteCustomField(deletedCustomFieldId);
      if (response.status === 'success') {
        toast.success(
          t('msg.customFieldDeleteOk', {
            0: deletedCustomField,
            1: response.datas.vulnCount.toString(),
          }),
        );
      }
    } catch (error) {
      toast.error(t('err.failedDeleteCustomField'));
      console.error('Error:', error);
    }
  };

  const deleteCustomFieldModal = (id: string, name: string) => {
    setDeletedCustomField(name);
    setDeletedCustomFieldId(id);
    setDeleteModalOpen(true);
  };

  const handlerdeleteCustomFieldModal = async (name: string) => {
    setDeleteModalOpen(false);
    if (name === 'confirm') {
      await confirmDeleteCustomField();
      fetchCustomFields();
    }
    setDeletedCustomFieldId('');
    setDeletedCustomField('');
  };

  return (
    <div className="mt-4">
      <Modal
        cancelText={t('btn.stay')}
        disablehr
        isOpen={deleteModalOpen}
        onCancel={() => handlerdeleteCustomFieldModal('cancel')}
        onSubmit={() => handlerdeleteCustomFieldModal('confirm')}
        submitText={t('btn.confirm')}
        title={t('msg.confirmSuppression')}
      >
        <span className="ml-3">
          {t('msg.customFieldDeleteNotice', { 0: deletedCustomField })}
        </span>
      </Modal>
      <Toaster />
      <Card title="test">
        <div className="">
          {currentCustomFields.map(
            (field: GetCustomFieldType, index: number) => (
              <div className="bg-gray-700 rounded-lg pb-2" key={field._id}>
                <div
                  className={`flex items-center justify-between ml-4 mt-1  ${index !== 0 ? 'mt-4' : ''}`}
                >
                  <label
                    className="font-medium leading-6 text-gray-300"
                    htmlFor={field._id}
                  >
                    {field.fieldType !== 'space' ? field.label : 'space'}
                  </label>
                  <div className="mr-4 mt-2">
                    <PrimaryButton
                      color="red"
                      onClick={() =>
                        deleteCustomFieldModal(field._id, field.label)
                      }
                    >
                      {
                        t('delete') //TODO:{t('add') //TODO: add i18n}
                      }
                    </PrimaryButton>
                  </div>
                </div>
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
