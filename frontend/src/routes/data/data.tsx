import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../../components/navbar/Sidebar';

export const Data = () => {
  const { t } = useTranslation();
  const sidebarList = [
    { name: t('collaborators'), value: 'collaborators', id: 1 },
    { name: t('companies'), value: 'companies', id: 2 },
    { name: t('clients'), value: 'clients', id: 3 },
    { name: t('templates'), value: 'templates', id: 4 },
    { name: t('customData'), value: 'customData', id: 5 },
    { name: `${t('import')} / ${t('export')}`, value: 'importExport', id: 6 },
  ];
  return (
    <div className="flex overflow-hidden">
      <Sidebar items={sidebarList} title={t('handleCustomData')} />
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};
