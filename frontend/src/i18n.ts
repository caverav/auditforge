import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translations from './i18n/index';

let language = localStorage.getItem('system_language');
if (!language) {
  language = 'en-US';
  localStorage.setItem('system_language', language);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('system_language') ?? 'en-US',
    resources: translations,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

export default i18n;
