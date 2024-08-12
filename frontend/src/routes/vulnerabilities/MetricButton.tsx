import React from 'react';

interface MetricButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const MetricButton: React.FC<MetricButtonProps> = ({ label, selected, onClick }) => {
  return (
    <button
      className={`py-2 px-4 border rounded ${selected ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'} hover:bg-gray-100`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MetricButton;
