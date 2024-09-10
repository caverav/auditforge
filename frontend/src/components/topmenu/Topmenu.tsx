import React from 'react';

type TopMenuProps = {
  auditName: string;
  auditType: string;
  onSave: () => void;
  additionalButtons?: React.ReactNode;
};

const TopMenu: React.FC<TopMenuProps> = ({
  auditName,
  auditType,
  onSave,
  additionalButtons,
}) => {
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">{auditName}</h1>
        {auditType ? (
          <span className="text-gray-400">({auditType})</span>
        ) : null}
      </div>

      <div className="flex items-center space-x-4">
        {additionalButtons ? additionalButtons : null}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          onClick={onSave}
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TopMenu;
