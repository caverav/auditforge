import clsx from 'clsx';
import { t } from 'i18next';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { EncryptionModal } from '@/routes/audits/edit/general/EncryptionModal';
import { encryptPDF, getAuditById } from '@/services/audits';

import DefaultRadioGroup from '../button/DefaultRadioGroup';
import DropdownButton, { ListItem } from '../button/DropdownButton';

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

const severityColorMap: Record<string, string> = {
  L: 'bg-green-600',
  M: 'bg-yellow-500',
  H: 'bg-orange-500',
  C: 'bg-red-600',
  default: 'bg-gray-600',
};

const getSeverityColor = (severity: string) => {
  return severityColorMap[severity] ?? severityColorMap.default;
};

const AuditSidebar = ({
  activeItem,
  setActiveItem,
  isCollapsed,
  setIsCollapsed,
  sortOrder,
  setSortOrder,
  menuItems,
  findings,
  sortOrderOptions,
  connectedUsers,
}: AuditSidebarProps) => {
  const handleSetIsCollapsed = useCallback(
    (collapsed: boolean) => setIsCollapsed(collapsed),
    [setIsCollapsed],
  );
  const handleSetActiveItem = useCallback(
    (item: string) => setActiveItem(item),
    [setActiveItem],
  );
  const severityOrder: Record<string, number> = {
    C: 1,
    H: 2,
    M: 3,
    L: 4,
    I: 5,
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleSetIsOpenModal = useCallback(
    (isOpen: boolean) => setIsOpenModal(isOpen),
    [],
  );
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [auditName, setAuditName] = useState('');
  const { auditId } = useParams();

  useEffect(() => {
    getAuditById(auditId)
      .then(audit => {
        setAuditName(audit.datas.name);
      })
      .catch(console.error);
  }, [auditId]);

  const fileTypes: ListItem[] = [
    {
      id: 1,
      value: 'docx',
      label: 'docx',
      onClick: () =>
        window.open(
          `${import.meta.env.VITE_API_URL}/api/audits/${auditId}/generate`,
          '_blank',
        ),
    },
    {
      id: 2,
      value: 'pdf',
      label: 'pdf',
      onClick: () =>
        window.open(
          `${import.meta.env.VITE_API_URL}/api/audits/${auditId}/generate/pdf`,
          '_blank',
        ),
    },
    {
      id: 3,
      value: 'json',
      label: 'json',
      onClick: () =>
        window.open(
          `${import.meta.env.VITE_API_URL}/api/audits/${auditId}/generate/json`,
          '_blank',
        ),
    },
    {
      id: 4,
      value: 'csv',
      label: 'csv',
      onClick: () =>
        window.open(
          `${import.meta.env.VITE_API_URL}/api/audits/${auditId}/generate/csv`,
          '_blank',
        ),
    },
    {
      id: 5,
      value: 'pdf/encrypted',
      label: `pdf (${t('encrypted')})`,
      onClick: () => setIsOpenModal(true),
    },
  ];

  findings.sort((a, b) => {
    const orderMultiplier = sortOrder === 'Ascending' ? -1 : 1;
    return (
      orderMultiplier * (severityOrder[a.severity] - severityOrder[b.severity])
    );
  });

  const handleSubmitEncrypt = async (password: string) => {
    setIsGeneratingPDF(true);

    const blob = await encryptPDF(password, auditId ?? '').catch(
      (error: Error) => {
        toast.error(t('err.errorGeneratingPdf'));
        console.error('Error generating PDF:', error);
      },
    );
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${auditName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
    setIsOpenModal(false);
    setIsGeneratingPDF(false);
  };

  return (
    <div
      className={clsx(
        'flex flex-col h-screen bg-gray-900 text-gray-100 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className={clsx('m-2', isCollapsed && 'sr-only')}>
          <DropdownButton items={fileTypes} placeholder={t('export')} />
        </div>
        <EncryptionModal
          auditName={auditName}
          handleSubmitEncrypt={handleSubmitEncrypt}
          isGeneratingPDF={isGeneratingPDF}
          isOpen={isOpenModal}
          onCancel={() => handleSetIsOpenModal(false)}
        />
        <button
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 p-2 rounded-full transition-colors duration-200 z-10"
          onClick={() => handleSetIsCollapsed(!isCollapsed)}
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
                  handleSetActiveItem(item.name);
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
