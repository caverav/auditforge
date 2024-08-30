import { Field, Label, Textarea } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';

type TextAreaEditorProps = {
  label: string;
  rows: number;
  value: string | string[];
  id: string;
  name: string;
  placeholder: string;
  onChange: (content: string) => void;
  requiredAlert?: boolean;
  requiredField?: boolean;
};

const TextArea: React.FC<TextAreaEditorProps> = ({
  label,
  rows,
  value,
  id,
  name,
  placeholder,
  onChange,
  requiredAlert = false,
  requiredField = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full rounded-md border-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
      <Field aria-required={requiredField}>
        <Label className="block font-medium leading-6 text-gray-300">
          {label + ' '}
          {requiredField ? <span className="text-red-500 text-lg">*</span> : ''}
        </Label>
        <div className="relative">
          <Textarea
            className={`${requiredAlert && 'empty:ring empty:ring-red-500 empty:ring-1'} bg-gray-800 w-full mt-2 p-2 rounded-lg shadow-sm`}
            id={id}
            name={name}
            onBlur={() => setIsFocused(false)}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e.target.value)
            }
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            rows={rows}
            value={value}
          />
          {!isFocused && requiredAlert && value === '' ? (
            <span className="absolute right-3 top-2 mt-2 ml-2 text-red-500">
              <ExclamationCircleIcon className="size-5" />
            </span>
          ) : null}
        </div>
      </Field>
    </div>
  );
};

export default TextArea;
