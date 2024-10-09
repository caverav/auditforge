import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useState } from 'react';

type FileInputProps = {
  id: string;
  name: string;
  onFileSelect: (file: { name: string; content: string }) => void;
  requiredField?: boolean;
  requiredAlert?: boolean;
  label?: string;
};

const FileInput: React.FC<FileInputProps> = ({
  id,
  name,
  onFileSelect,
  requiredField = false,
  requiredAlert = false,
  label,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onloadend = () => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const base64String = reader.result as string;
        onFileSelect({ name: file.name, content: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('');
      onFileSelect({ name: '', content: '' });
    }
  };

  return (
    <div>
      {label ? (
        <label
          className="text-sm font-medium leading-6 text-gray-300"
          htmlFor={id}
        >
          {label}{' '}
          {requiredField ? (
            <span className="text-red-500 text-lg">*</span>
          ) : null}
        </label>
      ) : null}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          accept=".doc,.docx,.docm,.ppt,.pptx"
          className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-white-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            requiredAlert && !fileName && !isFocused
              ? 'ring-1 ring-red-500'
              : ''
          }`}
          id={id}
          name={name}
          onBlur={() => setIsFocused(false)}
          onChange={handleFileChange}
          onFocus={() => setIsFocused(true)}
          type="file"
        />
        {!isFocused && requiredAlert && !fileName ? (
          <span className="absolute right-3 top-0 mt-2 ml-2 text-red-500">
            <ExclamationCircleIcon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      {fileName ? (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">{fileName}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FileInput;
