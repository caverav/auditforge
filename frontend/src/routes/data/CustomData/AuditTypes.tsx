import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line import/extensions
import { AuditType, getAuditTypes } from '@/services/data.ts';

import { NewAuditTypeForm } from './NewAuditType';

export const AuditTypes: React.FC = () => {
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const [auditTypes, setAuditTypes] = useState<AuditType[]>();

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
  }, []);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <NewAuditTypeForm />
      <div>{!loading ? JSON.stringify(auditTypes) : null}</div>
    </div>
  );
};
