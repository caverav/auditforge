import React, { useState } from 'react';
import Radio from './Radio';

export interface RadioOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const RadioGroup = ({ name, options, defaultValue, onChange }: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {options.map(option => (
        <Radio
          key={option.id}
          id={option.id}
          name={name}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          disabled={option.disabled}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
