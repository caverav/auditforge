import React from 'react';

import Radio from './Radio';

export type RadioOption = {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
};

const DefaultRadioGroup = ({
  name,
  options,
  value,
  onChange,
  isDisabled = false,
}: RadioGroupProps) => {
  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(event.target.value);
  };

  return (
    <div>
      {!isDisabled
        ? options.map(option => (
            <div className="mb-3" key={option.id}>
              <Radio
                checked={value === option.value}
                disabled={option.disabled}
                id={option.id}
                key={option.id}
                label={option.label}
                name={name}
                onChange={handleRadioGroupChange}
                value={option.value}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default DefaultRadioGroup;