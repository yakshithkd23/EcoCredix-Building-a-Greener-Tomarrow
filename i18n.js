// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Loads translations from the JSON files
  .use(LanguageDetector) // Detects user's language preference
  .use(initReactI18next) // Integrates with React
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Set to false in production
    backend: {
      // Path to translation files, served from public folder
      loadPath: '/locales/{{lng}}.json', // Path to translation files (now in public)
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense to handle fallback rendering while loading
    },
  });

export default i18n;
