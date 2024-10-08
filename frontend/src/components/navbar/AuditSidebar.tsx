import clsx from 'clsx';
import { t } from 'i18next';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import DefaultRadioGroup from '../button/DefaultRadioGroup';
import SelectDropdown from '../dropdown/SelectDropdown';

type MenuItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  additionalIcon?: React.ComponentType<{ className?: string }>;
};

type Finding = {
  id: number;
  name: string;
  category: string;
  severity: string;
  identifier: string;
};

type SortOption = {
  id: number;
  value: string;
};

type SortOrderOption = {
  id: string;
  label: string;
  value: string;
};

type ConnectedUser = {
  id: number;
  name: string;
  online: boolean;
};

type AuditSidebarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  sortBy: SortOption | null;
  setSortBy: (option: SortOption | null) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  menuItems: MenuItem[];
  findings: Finding[];
  sortOptions: SortOption[];
  sortOrderOptions: SortOrderOption[];
  connectedUsers: ConnectedUser[];
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'L':
      return 'bg-green-600';

    case 'M':
      return 'bg-yellow-500';

    case 'H':
      return 'bg-orange-500';

    case 'C':
      return 'bg-red-600';

    default:
      return 'bg-gray-600';
  }
};

const AuditSidebar = ({
  activeItem,
  setActiveItem,
  isCollapsed,
  setIsCollapsed,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  menuItems,
  findings,
  sortOptions,
  sortOrderOptions,
  connectedUsers,
}: AuditSidebarProps) => {
  const severityOrder: Record<string, number> = {
    C: 1,
    H: 2,
    M: 3,
    L: 4,
    I: 5,
  };

  findings.sort((a, b) => {
    const orderMultiplier = sortOrder === 'Ascending' ? 1 : -1;
    return (
      orderMultiplier * (severityOrder[a.severity] - severityOrder[b.severity])
    );
  });

  return (
    <div
      className={clsx(
        'flex flex-col h-screen bg-gray-900 text-gray-100 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2
          className={clsx(
            'font-semibold transition-opacity',
            isCollapsed ? 'opacity-0 w-0' : 'opacity-100',
          )}
        >
          {t('audit')}
        </h2>
        <button
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 p-2 rounded-full transition-colors duration-200"
          onClick={() => setIsCollapsed(!isCollapsed)}
          type="button"
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.name}>
              <Link
                className={clsx(
                  'w-full flex items-center justify-start gap-3 px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors duration-200',
                  'hover:bg-gray-800',
                  activeItem === item.name
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400',
                )}
                onClick={() => {
                  setActiveItem(item.name);
                }}
                to={item.value}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={clsx(
                    'flex-1 transition-opacity',
                    isCollapsed && 'opacity-0 w-0 overflow-hidden',
                  )}
                >
                  {item.name}
                </span>
                {item.additionalIcon ? (
                  <item.additionalIcon
                    className={clsx(
                      'h-4 w-4',
                      isCollapsed ? 'ml-0' : 'ml-auto',
                    )}
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className={clsx('mt-4 px-4', isCollapsed && 'px-2')}>
          <div className={clsx('mb-4 font-thin', isCollapsed && 'sr-only')}>
            <p className="text-gray-400 text-lg">{t('sortBy')} CVSS</p>
            <DefaultRadioGroup
              name="sortOrder"
              onChange={setSortOrder}
              options={sortOrderOptions}
              value={sortOrder}
            />
          </div>
          <ul className="space-y-2">
            {findings.map(finding => (
              <Link
                className="flex items-center gap-2 text-sm hover:bg-gray-800 transition-colors duration-200 rounded-lg"
                key={finding.id}
                to={`findings/${finding.identifier}`}
              >
                <li className="flex items-center gap-2 text-sm px-4 py-2">
                  <span
                    className={`w-6 h-6 flex items-center justify-center ${getSeverityColor(finding.severity)} text-white rounded-full font-medium`}
                  >
                    {finding.severity}
                  </span>
                  <span
                    className={clsx('text-gray-300', isCollapsed && 'sr-only')}
                  >
                    {finding.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="mb-2">
          <button
            className="w-full flex items-center justify-start gap-3 text-gray-400 hover:text-gray-100 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
            type="button"
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            <span
              className={clsx(
                'transition-opacity',
                isCollapsed && 'opacity-0 w-0 overflow-hidden',
              )}
            >
              {t('usersConnected')}
            </span>
          </button>
        </div>
        <ul className="space-y-2">
          {connectedUsers.map(user => (
            <li
              className="flex items-center gap-2 text-sm px-4 py-1"
              key={user.id}
            >
              <span
                className={clsx(
                  'w-2 h-2 rounded-full flex-shrink-0',
                  user.online ? 'bg-green-500' : 'bg-gray-500',
                )}
              />
              <span className={clsx('text-gray-300', isCollapsed && 'sr-only')}>
                {user.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuditSidebar;
