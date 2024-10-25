import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../components/card/Card';
import { AuditTypes } from './CustomData/AuditTypes';
import { CustomFields } from './CustomData/CustomFields';
import { CustomSections } from './CustomData/CustomSections';
import { Languages } from './CustomData/Languages';

export const CustomData: React.FC = () => {
  const { t } = useTranslation();

  const cardOptions = [
    {
      id: 1,
      title: t('languages'),
      cardTitle: t('languageUsedInAuditsAndVuls'),
      cardChildren: <Languages />,
    },
    {
      id: 2,
      title: t('auditTypes'),
      cardTitle: t('auditTypesUsedInAudits'),
      cardChildren: <AuditTypes />,
    },
    {
      id: 4,
      title: t('vulnerabilityTypes'),
      cardTitle: t('auditTypesUsedInAudits'),
      cardChildren: <>{t('vulnerabilityTypes')}</>,
    },
    {
      id: 5,
      title: t('vulnerabilityCategories'),
      cardTitle: t('auditTypesUsedInAudits'),
      cardChildren: <>{t('vulnerabilityCategories')}</>,
    },
    {
      id: 6,
      title: t('customFields'),
      cardTitle: t('createAndManageCustomFields'),
      cardChildren: <CustomFields />,
    },
    {
      id: 7,
      title: t('customSections'),
      cardTitle: t('createCustomSections'),
      cardChildren: <CustomSections />,
    },
  ];

  const [selected, setSelected] = useState(cardOptions[0].id);

  const [cardContent, setCardContent] = useState(cardOptions[0]);

  const handleOptionClick = (option: {
    id: number;
    title: string;
    cardTitle: string;
    cardChildren: ReactElement;
  }) => {
    setSelected(option.id);
    setCardContent(option);
  };

  return (
    <div>
      <div className="resize bg-gray-900 rounded-lg ">
        <div className="flex justify-left overflow-x-auto py-3 mx-4">
          {cardOptions.map(option => (
            <button
              className={`${selected === option.id ? 'bg-gray-700' : 'bg-gray-800'} p-2 ml-4 rounded-lg hover:bg-gray-700`}
              key={option.id}
              onClick={() => handleOptionClick(option)}
              type="button"
            >
              {option.title}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {cardContent.id === 6 ? (
          <CustomFields />
        ) : (
          <Card title={cardContent.cardTitle}>{cardContent.cardChildren}</Card>
        )}
      </div>
    </div>
  );
};
