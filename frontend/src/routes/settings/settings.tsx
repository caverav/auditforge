import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Card from '../../components/card/Card';
import SelectDropdown from '../../components/dropdown/SelectDropdown';

const languageOptions = [
  {
    id: 1,
    value: 'en-US',
  },
  {
    id: 2,
    value: 'de-DE',
  },
  {
    id: 3,
    value: 'fr-FR',
  },
  {
    id: 4,
    value: 'zh-CN',
  },
];

export const Settings = () => {
  // <---------------------
  // Lógica de selector de idiomas. TODO: Moverlo a componente

  const { i18n } = useTranslation();

  let storedLanguage = localStorage.getItem('system_language');

  if (!storedLanguage) {
    storedLanguage = 'en-US';
  }

  const [language, setLanguage] = useState({
    id: languageOptions.find(item => item.value === storedLanguage)?.id ?? 1,
    value: storedLanguage,
  });

  useEffect(() => {
    i18n.changeLanguage(language.value).catch(console.error);
    localStorage.setItem('system_language', language.value);
  }, [i18n, language]);

  // --------------------->

  return (
    <div className="p-4 md:w-2/3 md:mt-8 mx-auto">
      <Card title={t('generalSettings')}>
        <div className="px-2">
          <h2>{t('changeDisplayLanguage')}</h2>

          <div className="mt-2 mx-2">
            <SelectDropdown
              items={languageOptions}
              onChange={setLanguage}
              selected={language}
              title={t('changeDisplayLanguageInfo')}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
