import React from 'react';

import MetricButton from './MetricButton';

type MetricGroupProps = {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

const MetricGroup: React.FC<MetricGroupProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <h4 className="mb-2 text-white">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <MetricButton
            key={option}
            label={option}
            onClick={() => onSelect(option)}
            selected={selectedOption === option}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricGroup;
