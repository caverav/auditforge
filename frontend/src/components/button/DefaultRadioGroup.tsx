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
};

const DefaultRadioGroup = ({
  name,
  options,
  value,
  onChange,
}: RadioGroupProps) => {
  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(event.target.value);
  };

  return (
    <div>
      {options.map(option => (
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
      ))}
    </div>
  );
};

export default DefaultRadioGroup;
