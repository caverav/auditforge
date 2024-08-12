import React from 'react';
import MetricButton from './MetricButton';

interface MetricGroupProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const MetricGroup: React.FC<MetricGroupProps> = ({ label, options, selectedOption, onSelect }) => {
  return (
    <div className="mb-6">
      <h4 className="mb-2 text-white">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <MetricButton 
            key={option} 
            label={option} 
            selected={selectedOption === option} 
            onClick={() => onSelect(option)} 
          />
        ))}
      </div>
    </div>
  );
};

export default MetricGroup;