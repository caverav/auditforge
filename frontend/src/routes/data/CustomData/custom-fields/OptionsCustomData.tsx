import { t } from 'i18next';

import PrimaryButton from '../../../../components/button/PrimaryButton';
import SelectDropdown from '../../../../components/dropdown/SelectDropdown';
import SimpleInput from '../../../../components/input/SimpleInput';

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

type OptionsCustomDataProps = {
  languagesList: ListItem[];
  setLanguageSelected: (value: ListItem) => void;
  languageSelected: ListItem | null;
  setAddOptionField: React.Dispatch<React.SetStateAction<string>>;
  addOptionField: string;
  optionsData: OptionData[];
  setOptionsData: React.Dispatch<React.SetStateAction<OptionData[]>>;
};

export const OptionsCustomData: React.FC<OptionsCustomDataProps> = ({
  languagesList,
  setLanguageSelected,
  languageSelected,
  setAddOptionField,
  addOptionField,
  optionsData,
  setOptionsData,
}) => {
  const handlerAddOption = () => {
    if (addOptionField.trim() === '') return;
    setOptionsData([
      ...optionsData,
      {
        locale: languageSelected?.value ?? '',
        value: addOptionField,
      },
    ]);
    setAddOptionField(''); // Limpia el campo después de agregar
  };

  const handlerDeleteOption = (index: number) => {
    setOptionsData(prevOptionsData => {
      const updatedOptionsData = [...prevOptionsData];
      updatedOptionsData.splice(index, 1);
      return updatedOptionsData;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 content-start">
      <SelectDropdown
        items={languagesList}
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
          <PrimaryButton onClick={handlerAddOption}>+</PrimaryButton>
        </div>
      </div>
      <div className="bg-white/5 rounded-lg">
        {optionsData.map((option, index) => (
          <div
            className={`flex items-center gap-2 ${index !== 0 ? 'border-t-gray-600 border-t' : ''}`}
            key={index}
          >
            <div className="flex-grow mx-2">{option.value}</div>
            <div className="flex-shrink-0 p-1">
              <PrimaryButton
                aria-label={t('deleteOption')}
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
  );
};
