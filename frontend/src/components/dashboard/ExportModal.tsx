import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  displays: { id: string; name: string }[];
  selectedDisplays: string[];
  setSelectedDisplays: React.Dispatch<React.SetStateAction<string[]>>;
  auditName: string;
  setAuditName: React.Dispatch<React.SetStateAction<string>>;
  type: string;
};

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  displays,
  selectedDisplays,
  setSelectedDisplays,
  auditName,
  setAuditName,
  type,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedDisplays(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id],
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{`${t('exportDashboard')} (${type})`}</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="auditName">
            Audit Name:
          </label>
          <input
            className="w-full p-2 bg-gray-700 rounded"
            id="auditName"
            onChange={e => setAuditName(e.target.value)}
            type="text"
            value={auditName}
          />
        </div>
        <p className="mb-4">
          Select the data displays to include in the export:
        </p>
        <div className="space-y-2 mb-4">
          {displays.map(display => (
            <label className="flex items-center" key={display.id}>
              <input
                checked={selectedDisplays.includes(display.id)}
                className="mr-2"
                onChange={() => handleCheckboxChange(display.id)}
                type="checkbox"
              />
              {display.name}
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className={clsx('text-white font-bold py-2 px-4 rounded', {
              'bg-blue-600 hover:bg-blue-700': selectedDisplays.length > 0,
              'bg-blue-600/50': selectedDisplays.length === 0,
            })}
            disabled={selectedDisplays.length === 0}
            onClick={onConfirm}
            type="button"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
