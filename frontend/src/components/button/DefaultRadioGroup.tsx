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

const DefaultRadioGroup = ({
  name,
  options,
  value,
  onChange,
}: RadioGroupProps) => {
  const handleRadioGroupChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(event.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <div className="mb-3">
          <Radio
            key={option.id}
            id={option.id}
            name={name}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={handleRadioGroupChange}
          />
        </div>
      ))}
    </div>
  );
};

export default DefaultRadioGroup;
