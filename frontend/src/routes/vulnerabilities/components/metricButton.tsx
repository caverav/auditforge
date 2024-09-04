import React from 'react';

type MetricButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

const MetricButton: React.FC<MetricButtonProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      className={`py-2 px-4 border rounded font-bold focus:outline-none focus:shadow-outline ${selected ? 'bg-blue-800 text-white hover:bg-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-300'} `}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};

export default MetricButton;
