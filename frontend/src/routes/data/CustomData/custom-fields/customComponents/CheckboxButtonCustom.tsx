import { Checkbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';

import { GetCustomFieldType } from '../../../../../services/data';

export type CheckboxButtonProps = {
  text: string[];
  options: string[];
  setCurrentCustomFields: React.Dispatch<
    React.SetStateAction<GetCustomFieldType[]>
  >;
  id: string;
  currentLanguage: string;
};

const CheckboxButtonCustom = ({
  text,
  options,
  setCurrentCustomFields,
  id,
  currentLanguage,
}: CheckboxButtonProps) => {
  const [selectedBox, setSelectedBox] = useState<boolean[]>(
    options.map((option: string) =>
      text.some((item: string) => item === option),
    ),
  );

  useEffect(() => {
    setSelectedBox(
      options.map((option: string) =>
        text.some((item: string) => item === option),
      ),
    );
  }, [options, text]);

  const onChange = (index: number) => {
    const values = selectedBox.map((itemMap, i) =>
      i === index ? !itemMap : itemMap,
    );

    const selectedOptions = options.filter((_, index) => values[index]);
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === id
          ? {
              ...field,
              text: field.text.map(item =>
                item.locale === currentLanguage
                  ? { locale: item.locale, value: selectedOptions }
                  : item,
              ),
            }
          : field,
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      {options.map((option: string, index: number) => (
        <div
          className={`w-full flex items-center ${index !== 0 ? 'mt-2' : ''}`}
          key={index}
        >
          <Checkbox
            checked={selectedBox[index]}
            className="group flex items-center justify-center size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
            onChange={() => onChange(index)}
          >
            <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
          </Checkbox>
          <div className="ml-2">
            <p className="text-md text-gray-200">{option}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxButtonCustom;
