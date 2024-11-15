import {
  ArchiveBoxIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  FaceSmileIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../../components/navbar/Sidebar';

export const Data = () => {
  const { t } = useTranslation();
  const sidebarList = [
    {
      name: t('collaborators'),
      value: 'collaborators',
      id: 1,
      icon: <UserGroupIcon className="h-8 w-auto" />,
    },
    {
      name: t('companies'),
      value: 'companies',
      id: 2,
      icon: <BuildingOffice2Icon className="h-8 w-auto" />,
    },
    {
      name: t('clients'),
      value: 'clients',
      id: 3,
      icon: <FaceSmileIcon className="h-8 w-auto" />,
    },
    {
      name: t('templates'),
      value: 'templates',
      id: 4,
      icon: <DocumentTextIcon className="h-8 w-auto" />,
    },
    {
      name: t('customData'),
      value: 'customData',
      id: 5,
      icon: <ArchiveBoxIcon className="h-8 w-auto" />,
    },
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
