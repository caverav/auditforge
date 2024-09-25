import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import React, { ReactElement } from 'react';

import PrimaryButton from '../button/PrimaryButton';

type EditCardProps = {
  title: string;
  editTitle: string;
  children: ReactElement;
  isEditing: boolean;
  onClickEdit: () => void;
  onClickSave: () => void;
  onClickCancel: () => void;
};

const EditCard: React.FC<EditCardProps> = ({
  title,
  editTitle,
  children,
  isEditing,
  onClickEdit,
  onClickSave,
  onClickCancel,
}) => {
  return (
    <div className="border rounded-lg bg-gray-900">
      <div className="flex justify-between py-3 mx-4">
        {!isEditing ? (
          <>
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClickEdit} type="button">
              <PencilSquareIcon className="py-1 size-10" />
            </button>
          </>
        ) : (
          <h2 className="text-xl pb-3 font-semibold">{editTitle}</h2>
        )}
      </div>
      <hr className="h-1 mx-4 bg-gray-600 border-0 rounded" />
      <div className="p-2">{children}</div>
      {isEditing ? (
        <div>
          <hr className="h-1 mx-4 bg-gray-600 border-0 rounded" />
          <div className="flex items-end space-x-4 m-4">
            <PrimaryButton color="gray" onClick={onClickCancel}>
              {t('btn.cancel')}
            </PrimaryButton>
            <PrimaryButton onClick={onClickSave}>{t('btn.save')}</PrimaryButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditCard;
