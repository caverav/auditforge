import { Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx';



interface TextAreaEditor {
    label: string;
    rows: number;
    value: string;
    id: string;
    name: string;
    placeholder: string;
    onChange: (content: string) => void;
}


const TextArea: React.FC<TextAreaEditor> = ({ label, rows, value, id, name, placeholder, onChange}) => {

    
    return (
        <div className="p-4 w-full rounded-md border-0 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <Field>
                <Label className="block font-medium leading-6 text-gray-300">{label}</Label>
                <Textarea
                className={"w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                id={id}
                name={name}
                />
            </Field>
        </div>
    )
}

export default TextArea;