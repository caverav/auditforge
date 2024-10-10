import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SimpleInput from './SimpleInput';

type PasswordInputProps = {
  label?: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  requiredAlert?: boolean;
  requiredField?: boolean;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
  requiredAlert = false,
  requiredField = false,
}) => {
  const { t } = useTranslation();
  const [type, setType] = useState<'password' | 'text'>('password');
  return (
    <>
      {label ? (
        <label
          className="text-sm font-medium leading-6 text-gray-300"
          htmlFor={id}
        >
          {`${label} `}
          {requiredField ? <span className="text-red-500 text-lg">*</span> : ''}
        </label>
      ) : null}
      <div className="flex flex-row">
        <div className="basis-11/12">
          <SimpleInput
            disabled={disabled}
            id={id}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            requiredAlert={requiredAlert}
            requiredField={requiredField}
            type={type}
            value={value}
          />
        </div>
        <div className="basis-1/12 flex items-center justify-center">
          <button
            aria-label={
              type === 'password'
                ? t('aria.showPassword')
                : t('aria.hidePassword')
            }
            aria-pressed={type === 'text'}
            onClick={() =>
              setType(prevType =>
                prevType === 'password' ? 'text' : 'password',
              )
            }
            type="button"
          >
            {type === 'password' ? (
              <EyeIcon className="size-6" />
            ) : (
              <EyeSlashIcon className="size-6" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
