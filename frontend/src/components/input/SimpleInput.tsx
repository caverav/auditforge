import { ChangeEvent } from "react";

interface SimpleInputProps {
  label?: string;
  id: string;
  name: string;
  type: "text" | "number";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

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
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="mt-2 rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          disabled={disabled}
          className="bg-gray-800 block w-full rounded-md py-1.5 pl-7 pr-7 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default SimpleInput;
