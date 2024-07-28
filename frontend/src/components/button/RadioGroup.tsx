import React from "react";
import Radio from "./Radio";

export interface RadioOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({ name, options, value, onChange }: RadioGroupProps) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div>
      {options.map((option) => (
        <Radio
          key={option.id}
          id={option.id}
          name={name}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          disabled={option.disabled}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
