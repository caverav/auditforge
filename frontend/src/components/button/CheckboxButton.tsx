import { Checkbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';

export type CheckboxButtonProps = {
  text: string;
  checked: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckboxButton = ({ text, checked, onChange }: CheckboxButtonProps) => {
  const handleCheckboxChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Checkbox
        checked={checked}
        className="group flex items-center justify-center size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
        onChange={handleCheckboxChange}
      >
        <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
      </Checkbox>
      <div className="ml-2">
        <p className="text-md text-gray-200">{text}</p>
      </div>
    </div>
  );
};

export default CheckboxButton;
