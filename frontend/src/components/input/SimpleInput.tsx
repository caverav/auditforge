import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

interface SimpleInputProps {
  label?: string;
  id: string;
  name: string;
  type: "text" | "number";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
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
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-6 text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
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
          className={`bg-gray-800 block w-full rounded-md py-1.5 p-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            required && value === "" && !isFocused ? "ring-1 ring-red-500" : ""
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!isFocused && required && value === "" && (
          <span className="absolute right-3 top-0 mt-2 ml-2 text-red-500">
            <ExclamationCircleIcon className="size-5" />
          </span>
        )}
      </div>
    </div>
  );
};

export default SimpleInput;
