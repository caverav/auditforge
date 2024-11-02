import React from 'react';

type CWEItem = {
  id: string;
  size: number;
};

type Props = {
  items: CWEItem[];
  mostCommon: string;
};

export const CWECloud: React.FC<Props> = ({ items, mostCommon }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg h-[300px]">
      <h3 className="text-lg font-semibold text-white mb-2">CWEs found</h3>
      <p className="text-sm text-gray-400 mb-4">Most common: {mostCommon}</p>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {items.map(item => (
          <span
            className="text-blue-400 hover:text-blue-300 transition-colors"
            key={item.id}
            style={{
              fontSize: `${Math.max(0.8, Math.min(2, item.size / 10))}rem`,
            }}
          >
            {item.id}
          </span>
        ))}
      </div>
    </div>
  );
};
