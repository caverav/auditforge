import { TrashIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

import DefaultRadioGroup from '../../../../components/button/DefaultRadioGroup';
import PrimaryButton from '../../../../components/button/PrimaryButton';
import Card from '../../../../components/card/Card';
import SelectDropdown from '../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../components/input/SimpleInput';
import Modal from '../../../../components/modal/Modal';
import RichText from '../../../../components/text/RichText';
import {
  deleteCustomField,
  GetCustomFieldType,
  updateCustomField,
  UpdateCustomFieldType,
} from '../../../../services/data';
import {
  CheckboxButtonCustom,
  DayPickerCustom,
  MultiSelectDropdownCustom,
  PopOverEditCustomField,
  SelectDropdownCustom,
} from './customComponents';

type TextData = {
  locale: string;
  value: string | string[];
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
  locale?: string;
};

type CustomFieldProps = {
  currentCustomFields: GetCustomFieldType[];
  displayOptionSelected: ListItem;
  languagesList: ListItem[];
  setCurrentCustomFields: React.Dispatch<
    React.SetStateAction<GetCustomFieldType[]>
  >;
  fetchCustomFields: () => void;
};

export const CustomFieldDisplay: React.FC<CustomFieldProps> = ({
  currentCustomFields,
  displayOptionSelected,
  languagesList,
  setCurrentCustomFields,
  fetchCustomFields,
}) => {
  const stringList = ['text', 'input', 'radio', 'date', 'select'];

  const [deletedCustomField, setDeletedCustomField] = useState<string>('');
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deletedCustomFieldId, setDeletedCustomFieldId] = useState<string>('');

  const [languageIndex, setLanguageIndex] = useState<number>(0);
  const [currentLanguage, setCurrentLanguage] = useState<ListItem>(
    languagesList[0],
  );
  const [languagesUsed, setLanguagesUsed] = useState<ListItem[]>([
    languagesList[0],
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = currentCustomFields.filter(field => {
    return field.display === displayOptionSelected.value;
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlerTextString = (text: TextData[]) => {
    return Array.isArray(text[languageIndex].value)
      ? text[languageIndex].value[0]
      : text[languageIndex].value;
  };

  const handlerTextArray = (text: TextData[]) => {
    return Array.isArray(text[languageIndex].value)
      ? text[languageIndex].value
      : [text[languageIndex].value];
  };

  const handlerInputChangeText = (id: string, value: string) => {
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
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

  const renderField = (field: GetCustomFieldType) => {
    const { _id, fieldType, size, offset, options, text } = field;
    const validSize = Math.min(12, Math.max(0, size));
    const sizeStyle =
      validSize > 0
        ? Math.round((validSize / 12) * 100)
        : Math.round((1 / 12) * 100);

    languagesUsed.forEach(language => {
      const existsInText = text.some(item => item.locale === language.value);

      if (!existsInText) {
        if (stringList.includes(fieldType)) {
          text.push({ locale: language.value, value: '' });
        } else if (
          fieldType === 'checkbox' ||
          fieldType === 'select-multiple'
        ) {
          text.push({ locale: language.value, value: [] });
        }
      }
    });

    switch (fieldType) {
      case 'checkbox':
        return (
          <div className="px-4 min-h-6">
            <span className="font-medium leading-6 text-gray-300">
              {t('offset')}: {offset}
            </span>
            <div
              className="mt-1 rounded-lg"
              style={{ width: `calc(${sizeStyle}%)` }}
            >
              <CheckboxButtonCustom
                currentLanguage={currentLanguage.value}
                id={_id}
                options={options.map(option => option.value)}
                setCurrentCustomFields={setCurrentCustomFields}
                text={handlerTextArray(text)}
              />
            </div>
          </div>
        );

      case 'space':
        return (
          <div className="px-4">
            <span className="font-medium leading-6 text-gray-300">
              {t('offset')}: {offset}
            </span>
            <div
              className="bg-white w-full rounded-lg mt-1 h-28"
              style={{ width: `calc(${sizeStyle}%)` }}
            />
          </div>
        );

      case 'text':
        return (
          <div>
            <span className="font-medium leading-6 text-gray-300 mx-4">
              {t('offset')}: {offset}
            </span>
            <div
              style={{
                width: `calc(${sizeStyle}%)`,
              }}
            >
              <RichText
                label=""
                onChange={(value: string) => handlerInputChangeText(_id, value)}
                placeholder=""
                value={handlerTextString(text)}
              />
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="px-4">
            <span className="font-medium leading-6 text-gray-300">
              {t('offset')}: {offset}
            </span>
            <div
              className="rounded-lg mt-1"
              style={{ width: `calc(${sizeStyle}%)` }}
            >
              <SimpleInput
                id={_id}
                name={_id}
                onChange={(value: string) => handlerInputChangeText(_id, value)}
                placeholder=""
                type="text"
                value={handlerTextString(text)}
              />
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="px-4 min-h-6">
            <span className="font-medium leading-6 text-gray-300">
              {t('offset')}: {offset}
            </span>
            <div
              className="rounded-lg mt-1"
              style={{ width: `calc(${sizeStyle}%)` }}
            >
              <DefaultRadioGroup
                name={_id}
                onChange={(value: string) => handlerInputChangeText(_id, value)}
                options={options.map((option, index) => ({
                  id: index.toString(),
                  label: option.value,
                  value: option.value,
                }))}
                value={handlerTextString(text)}
              />
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="px-4 min-h-6">
            <span className="font-medium leading-6 text-gray-300">
              {t('offset')}: {offset}
            </span>
            <div
              className="rounded-lg"
              style={{ width: `calc(${sizeStyle}%)` }}
            >
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
            </div>
          </div>
        );

      case 'select-multiple':
        return (
          <div className="px-4 min-h-6">
            <span className="font-medium leading-6 text-gray-300">
              {t('offset')}: {offset}
            </span>
            <div
              className="rounded-lg mt-1"
              style={{ width: `calc(${sizeStyle}%)` }}
            >
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
            </div>
          </div>
        );

      case 'date':
        return (
          <div className="">
            <span className="font-medium leading-6 text-gray-300 mx-4">
              {t('offset')}: {offset}
            </span>
            <div
              className="rounded-lg"
              style={{ width: `calc(${sizeStyle}%)` }}
            >
              <DayPickerCustom
                currentLanguage={currentLanguage.value}
                id={_id}
                label=""
                setCurrentCustomFields={setCurrentCustomFields}
                text={handlerTextString(text)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const clearCustomFieldString = (id: string) => {
    setCurrentCustomFields(prevFields =>
      prevFields.map(field =>
        field._id === id
          ? {
              ...field,
              text: field.text.map(itemIter =>
                itemIter.locale === currentLanguage.value
                  ? {
                      locale: itemIter.locale,
                      value: '',
                    }
                  : itemIter,
              ),
            }
          : field,
      ),
    );
  };

  const clearCustomFieldArray = (id: string) => {
    setCurrentCustomFields(prevFields =>
      prevFields.map(field =>
        field._id === id
          ? {
              ...field,
              text: field.text.map(itemIter =>
                itemIter.locale === currentLanguage.value
                  ? {
                      locale: itemIter.locale,
                      value: [],
                    }
                  : itemIter,
              ),
            }
          : field,
      ),
    );
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

  const submitUpdateCustomField = async () => {
    const newCustomFields: UpdateCustomFieldType[] = currentCustomFields.map(
      (customField: GetCustomFieldType, index: number) => {
        return {
          ...customField,
          text: customField.text.filter(item => {
            if (typeof item.value === 'string') {
              return item.value !== '';
            }
            if (Array.isArray(item.value)) {
              return item.value.length > 0;
            }
            return true;
          }),
          position: index,
        };
      },
    );

    try {
      const response = await updateCustomField(newCustomFields);
      if (response.status === 'success') {
        toast.success(t('msg.customFieldUpdatedOk'));
        fetchCustomFields();
      }
    } catch (error) {
      toast.error(t('err.failedUpdateCustomField'));
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (currentItems.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentItems.length, currentPage]);

  useEffect(() => {
    const findLang = languagesUsed.findIndex(
      lang => lang.value === currentLanguage.value,
    );
    if (findLang !== -1) {
      setLanguageIndex(findLang);
    } else {
      setLanguagesUsed(prevLang => [...prevLang, currentLanguage]);
      setLanguageIndex(languagesUsed.length);
    }
  }, [currentLanguage, languagesUsed]);

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
      <Card title={t('manageCustomFields')}>
        <div>
          <div className="mb-5">
            <SelectDropdown
              items={languagesList}
              onChange={(item: ListItem) => setCurrentLanguage(item)}
              placeholder={t('selectLanguage')}
              selected={currentLanguage}
              title={t('selectLanguage')}
            />
          </div>
          {currentItems.map((field: GetCustomFieldType, index: number) => (
            <div className="bg-gray-700 rounded-lg pb-3" key={field._id}>
              <div
                className={`flex items-center justify-between mt-1  ${index !== 0 ? 'mt-4' : ''}`}
              >
                <label
                  className="font-medium leading-6 text-gray-300 ml-4"
                  htmlFor={field._id}
                >
                  {field.fieldType !== 'space' ? field.label : 'space'}
                </label>
                <div className="mr-4 mt-2 flex space-x-4">
                  {field.fieldType !== 'space' &&
                  field.text.length === languagesUsed.length &&
                  (Array.isArray(field.text[languageIndex].value)
                    ? field.text[languageIndex].value.length > 0
                    : field.text[languageIndex].value.trim() !== '') ? (
                    <div className="h-10">
                      <PrimaryButton
                        color="blue"
                        onClick={() =>
                          stringList.includes(field.fieldType)
                            ? clearCustomFieldString(field._id)
                            : clearCustomFieldArray(field._id)
                        }
                      >
                        {t('btn.clear')}
                      </PrimaryButton>
                    </div>
                  ) : (
                    <div className="h-10" />
                  )}
                  <div className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:max-h-10">
                    <PopOverEditCustomField
                      currentCustomField={field}
                      currentLanguage={currentLanguage.value}
                      setCurrentCustomFields={setCurrentCustomFields}
                    />
                    <PrimaryButton
                      color="red"
                      onClick={() =>
                        deleteCustomFieldModal(field._id, field.label)
                      }
                    >
                      <TrashIcon className="h-5 w-5" />
                    </PrimaryButton>
                  </div>
                </div>
              </div>
              <div className="w-full">{renderField(field)}</div>
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <PrimaryButton
              color="blue"
              onClick={() => submitUpdateCustomField()}
            >
              {t('btn.save')}
            </PrimaryButton>
            <div className="flex space-x-4">
              {currentPage > 1 ? (
                <PrimaryButton color="blue" onClick={goToPreviousPage}>
                  {t('btn.previous')}
                </PrimaryButton>
              ) : null}
              {currentPage < totalPages ? (
                <PrimaryButton color="blue" onClick={goToNextPage}>
                  {t('btn.next')}
                </PrimaryButton>
              ) : (
                <div style={{ width: '70px' }} />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
