import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SelectDropdown from '../../../../components/dropdown/SelectDropdown';
import { getAuditById } from '../../../../services/audits';
import DivWrapper from './DivWrapper';

type ScopeList = {
  scope: { name: string; hosts: string[] }[];
};

type ListItem = {
  id: number;
  value: string;
  label?: string;
};

export const Network = () => {
  const { auditId } = useParams();

  const [scope, setScope] = useState<ScopeList>({ scope: [] });
  const [loadingScope, setLoadingScope] = useState<boolean>(true);
  const [selectedHosts, setSelectedHosts] = useState<
    Record<string, ListItem | null>
  >({});

  useEffect(() => {
    const fetchAuditData = async () => {
      if (!auditId) {
        return;
      }

      try {
        const dataAudit = await getAuditById(auditId);

        setScope({ scope: dataAudit.datas.scope });

        setLoadingScope(false);
      } catch (error) {
        console.error('Error fetching audit data:', error);
        setLoadingScope(false);
      }
    };

    fetchAuditData().catch(console.error);
  }, [auditId]);

  const handleSelectChange = (name: string, selectedHost: ListItem) => {
    setSelectedHosts(prevSelectedHosts => ({
      ...prevSelectedHosts,
      [name]: selectedHost,
    }));
  };

  return (
    <DivWrapper>
      {loadingScope ? (
        <p>Loading...</p>
      ) : (
        scope.scope.map((item, index) => (
          <div className="mb-4" key={index}>
            <SelectDropdown
              items={item.hosts.map((host, idx) => ({
                id: idx,
                value: host,
                label: host,
              }))}
              onChange={selectedItem =>
                handleSelectChange(item.name, selectedItem)
              }
              selected={selectedHosts[item.name] ?? null}
              title={item.name}
            />
          </div>
        ))
      )}
    </DivWrapper>
  );
};
