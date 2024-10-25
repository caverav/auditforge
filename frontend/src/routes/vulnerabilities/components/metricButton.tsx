import { StarIcon } from '@heroicons/react/20/solid';
import React from 'react';

type MetricButtonProps = {
  isHighlighted: boolean;
  label: string;
  selected: boolean;
  onClick: () => void;
};

const MetricButton: React.FC<MetricButtonProps> = ({
  isHighlighted,
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      className={`border rounded font-bold focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out
    ${selected ? 'bg-blue-800 text-white hover:bg-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-300'}
    ${isHighlighted ? 'py-2 px-6' : 'py-2 px-4'}
  `}
      onClick={onClick}
      type="button"
    >
      <div className="flex flex-row items-center">
        {label}
        <div
          className={`transition-all duration-500 ease-in-out ${isHighlighted ? 'block' : 'hidden'} pl-2`}
        >
          <StarIcon className="size-4" />
        </div>
      </div>
    </button>
  );
};

export default MetricButton;
