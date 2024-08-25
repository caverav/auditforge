import { Field, Label, Textarea } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

interface TextAreaEditorProps {
  label: string;
  rows: number;
  value: string | string[];
  id: string;
  name: string;
  placeholder: string;
  onChange: (content: string) => void;
  required?: boolean;
}

const TextArea: React.FC<TextAreaEditorProps> = ({
  label,
  rows,
  value,
  id,
  name,
  placeholder,
  onChange,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full rounded-md border-0 placeholder:text-gray-400 sm:text-sm sm:leading-6">
      <Field>
        <Label className="block font-medium leading-6 text-gray-300">
          {label}
        </Label>
        <div className="relative">
          <Textarea
            className={`${required && "empty:ring empty:ring-red-500 empty:ring-1"} bg-gray-800 w-full mt-2 p-2 rounded-lg shadow-sm`}
            rows={rows}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e.target.value)
            }
            placeholder={placeholder}
            id={id}
            name={name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {!isFocused && required && value === "" && (
            <span className="absolute right-3 top-2 mt-2 ml-2 text-red-500">
              <ExclamationCircleIcon className="size-5" />
            </span>
          )}
        </div>
      </Field>
    </div>
  );
};

export default TextArea;
