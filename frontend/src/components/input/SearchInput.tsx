import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';

type SearchInputProps = {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'number';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
  buttonLabel: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-300"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative mt-2 flex rounded-md shadow-sm">
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id={id}
          name={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 bg-gray-300 rounded-r-md"
          onClick={onClick}
          type="button"
        >
          <MagnifyingGlassIcon className="py-1 size-10 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
