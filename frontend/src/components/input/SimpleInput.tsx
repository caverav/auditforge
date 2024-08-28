import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';

type SimpleInputProps = {
  label?: string;
  id: string;
  name: string;
  type: 'text' | 'number' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  requiredAlert?: boolean;
  requiredField?: boolean;
};

const SimpleInput: React.FC<SimpleInputProps> = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
  requiredAlert = false,
  requiredField = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      {label ? (
        <label
          className="text-sm font-medium leading-6 text-gray-300"
          htmlFor={id}
        >
          {label + (requiredField ? ' (*)' : '')}
        </label>
      ) : null}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          className={`bg-gray-800 block w-full rounded-md py-1.5 p-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            requiredAlert && value === '' && !isFocused
              ? 'ring-1 ring-red-500'
              : ''
          }`}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={() => setIsFocused(false)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder + (requiredField && !label ? ' (*)' : '')}
          required={requiredField}
          type={type}
          value={value}
        />
        {!isFocused && requiredAlert && value === '' ? (
          <span className="absolute right-3 top-0 mt-2 ml-2 text-red-500">
            <ExclamationCircleIcon className="size-5" />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default SimpleInput;
