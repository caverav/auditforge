import { Checkbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

import { GetCustomFieldType } from '../../../../../services/data';

export type CheckboxButtonProps = {
  text: string[];
  options: string[];
  setCurrentCustomFields: (fields: GetCustomFieldType[]) => void;
  id: string;
};

const CheckboxButtonCustom = ({
  text,
  // checked,
  // onChange,
  options,
  setCurrentCustomFields,
  id,
}: CheckboxButtonProps) => {
  const [selectedBox, setSelectedBox] = useState<boolean[]>(
    // new Array(options.length).fill(false),
    options.map((option: string) =>
      text.some((item: string) => (item === option ? true : false)),
    ),
  );

  const onChange = (index: number) => {
    const values = selectedBox.map((itemMap, i) =>
      i === index ? !itemMap : itemMap,
    );
    setSelectedBox(values);
    /* setSelectedBox((prevState: boolean[]) =>
      prevState.map((itemMap, i) => (i === index ? !itemMap : itemMap)),
    ); */
    const selectedOptions = options.filter((_, index) => values[index]);
    setCurrentCustomFields((prevFields: GetCustomFieldType[]) => {
      return prevFields.map((field: GetCustomFieldType) =>
        field._id === id
          ? {
              ...field,
              text: [{ locale: 'es-ES', value: selectedOptions }],
            }
          : field,
      );
    });
  };

  return (
    <div className="flex items-center">
      {options.map((option: string, index: number) => (
        <div key={index}>
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
