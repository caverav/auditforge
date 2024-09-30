/* eslint-disable import/extensions */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditCard from '@/components/card/EditCard';
import { AuditType, getAuditTypes, updateAuditTypes } from '@/services/data.ts';

import { AuditTypeList } from './AuditTypeList';
import { NewAuditTypeForm } from './NewAuditType';

export const AuditTypes: React.FC = () => {
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const [auditTypes, setAuditTypes] = useState<AuditType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuditTypes = async () => {
      try {
        const data = await getAuditTypes();
        setAuditTypes(data.datas);
        setLoading(false);
      } catch (err) {
        setError('Error fetching auditTypes');
        setLoading(false);
      }
    };

    void fetchAuditTypes();
  }, [isEditing]);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  /**
   * Lógica para hacer uptdate (PUT)
   * de los lenguajes.
   */
  const [newAuditTypeList, setNewAuditTypeList] = useState<AuditType[]>([]);

  const handleUpdateAuditList = useCallback(
    (data: AuditType[]) => {
      setNewAuditTypeList(data);
    },
    [setNewAuditTypeList],
  );

  const onClickSave = async () => {
    try {
      await updateAuditTypes(newAuditTypeList);
      setIsEditing(false);
    } catch (error) {
      setError('Error updating audit types');
      return;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NewAuditTypeForm
        onAddAuditType={newAuditType =>
          setAuditTypes(prevAudits => [...prevAudits, newAuditType])
        }
      />
      {loading ? (
        t('loading')
      ) : (
        <EditCard
          editTitle={t('tooltip.edit')}
          isEditing={isEditing}
          onClickCancel={() => setIsEditing(false)}
          onClickEdit={() => setIsEditing(true)}
          onClickSave={onClickSave}
          title={t('listOfAuditTypes')}
        >
          <AuditTypeList
            auditTypes={auditTypes}
            isDisabled={!isEditing}
            onUpdateList={handleUpdateAuditList}
          />
        </EditCard>
      )}
    </div>
  );
};
