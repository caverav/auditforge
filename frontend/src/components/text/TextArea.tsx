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
        <div className="w-full">
            <Field>
                <Label className="block text-sm font-medium leading-6 text-gray-300">{label}</Label>
                <Textarea
                className={clsx(
                    'w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
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