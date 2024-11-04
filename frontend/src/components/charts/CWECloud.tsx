import { t } from 'i18next';
import React from 'react';
import { FaBug } from 'react-icons/fa';

type CWEItem = {
  id: string;
  size: number;
};

type Props = {
  items: CWEItem[];
  mostCommon: string;
};

export const CWECloud: React.FC<Props> = ({ items, mostCommon }) => {
  if (!items.length) {
    return (
      <p className="text-sm text-gray-500">{t('err.noMatchingRecords')}</p>
    );
  }
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <p className="text-sm text-gray-400 mb-4">
        {t('mostCommon')}: {mostCommon}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center"
          >
            <FaBug className="text-red-500 mr-3" size={24} />
            <div>
              <p className="text-white text-lg font-semibold">{item.id}</p>
              <p className="text-gray-400">
                {t('occurrences')}: {item.size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
