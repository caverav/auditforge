import React from 'react';

import MetricButton from './metricButton';

type Option = {
  label: string;
  value: string;
};

type MetricGroupProps = {
  label: string;
  options: Option[];
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
            key={option.value}
            label={option.label}
            onClick={() => onSelect(option.value)}
            selected={selectedOption === option.value}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricGroup;
