import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//import translations from i18n
import translations from './i18n/index';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
    lng: 'en-US',
		resources: translations,
		fallbackLng: 'en-US',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
