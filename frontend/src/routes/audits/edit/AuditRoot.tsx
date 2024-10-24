import { Cvss3P1 } from 'ae-cvss-calculator';
import { BarChart, Globe, List, Plus, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import DropdownButton, {
  ListItem,
} from '../../../components/button/DropdownButton';
import AuditSidebar from '../../../components/navbar/AuditSidebar';
import { Finding, getAuditById } from '../../../services/audits';
import { EncryptionModal } from './general/EncryptionModal';

export const AuditRoot = () => {
  const { t } = useTranslation();
  const { auditId } = useParams();
  const [activeItem, setActiveItem] = useState(t('generalInformation'));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<{ id: number; value: string } | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState('Descending');

  const [findings, setFindings] = useState<
    {
      id: number;
      name: string;
      category: string;
      severity: string;
      identifier: string;
    }[]
  >([]);

  const menuItems = [
    { name: t('generalInformation'), icon: Settings, value: 'general' },
    {
      name: t('dashboard'),
      icon: BarChart,
      value: 'dashboard',
    },
    { name: t('networkScan'), icon: Globe, value: 'network' },
    {
      name: t('findings'),
      icon: List,
      additionalIcon: Plus,
      value: 'findings/add',
    },
  ];

  const cvssStringToSeverity = (cvssScore: string) => {
    try {
      const cvssVector = new Cvss3P1(cvssScore);
      const score = cvssVector.calculateExactOverallScore();
      if (score >= 9.0) {
        return 'C';
      }
      if (score >= 7.0) {
        return 'H';
      }
      if (score >= 4.0) {
        return 'M';
      }
      if (score >= 0.1) {
        return 'L';
      }
    } catch (error) {
      console.error('Invalid CVSS vector:', error);
    }
    return 'I';
  };
  const [auditName, setAuditName] = useState('');

  useEffect(() => {
    getAuditById(auditId)
      .then(audit => {
        setFindings(
          audit.datas.findings.map((finding: Finding) => {
            return {
              id: finding.identifier,
              name: finding.title,
              category: 'No Category',
              severity: cvssStringToSeverity(finding.cvssv3),
              identifier: finding._id,
            };
          }),
        );
        setAuditName(audit.datas.name);
      })
      .catch(console.error);
  }, [auditId]);

  const sortOptions = [{ id: 1, value: 'CVSS Score', label: t('cvssScore') }];

  const sortOrderOptions = [
    { id: 'desc', label: t('descending'), value: 'Descending' },
    { id: 'asc', label: t('ascending'), value: 'Ascending' },
  ];

  const connectedUsers: { id: number; name: string; online: boolean }[] = [];

  /**
   * PDF Export encryption
   */

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleSubmitEncrypt = async (password: string) => {
    const bodyParam = {
      password,
    };
    setIsGeneratingPDF(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/audits/${auditId}/generate/pdf`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyParam),
        },
      );

      if (!response.ok) {
        throw new Error('Error generating PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${auditName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsOpenModal(false);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      toast.error(t('err.errorGeneratingPdf'));
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  /**
   * PDF Export encryption
   */

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

  return (
    <div className="flex overflow-hidden">
      <AuditSidebar
        activeItem={activeItem}
        connectedUsers={connectedUsers}
        fileTypes={fileTypes}
        findings={findings}
        isCollapsed={isCollapsed}
        menuItems={menuItems}
        setActiveItem={setActiveItem}
        setIsCollapsed={setIsCollapsed}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        sortOptions={sortOptions}
        sortOrder={sortOrder}
        sortOrderOptions={sortOrderOptions}
      />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <div className="m-3">
        <DropdownButton items={fileTypes} placeholder={t('export')} />
      </div>
      <EncryptionModal
        auditName={auditName}
        handleSubmitEncrypt={handleSubmitEncrypt}
        isGeneratingPDF={isGeneratingPDF}
        isOpen={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      />
    </div>
  );
};
