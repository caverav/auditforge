import { Field, Label, Textarea } from "@headlessui/react";
import { ChangeEvent } from "react";

interface TextAreaEditorProps {
  label: string;
  rows: number;
  value: string | string[];
  id: string;
  name: string;
  placeholder: string;
  onChange: (content: string) => void;
}

const TextArea: React.FC<TextAreaEditorProps> = ({
  label,
  rows,
  value,
  id,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-full rounded-md border-0 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
      <Field>
        <Label className="block font-medium leading-6 text-gray-300">
          {label}
        </Label>
        <Textarea
          className={"bg-gray-800 w-full mt-2 p-2 rounded-lg shadow-sm "}
          rows={rows}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          id={id}
          name={name}
        />
      </Field>
    </div>
  );
};

export default TextArea;
