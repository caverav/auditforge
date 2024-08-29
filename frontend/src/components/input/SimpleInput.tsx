import { ChangeEvent } from 'react';

type SimpleInputProps = {
  label?: string;
  id: string;
  name: string;
  type: 'text' | 'number';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
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
}) => {
  return (
    <div>
      {label ? (
        <label
          className="block text-sm font-medium leading-6 text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
      <div className="mt-2 rounded-md shadow-sm">
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          disabled={disabled}
          id={id}
          name={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </div>
  );
};

export default SimpleInput;
