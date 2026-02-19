import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // carga traducciones desde /public/locales
  .use(LanguageDetector) // detecta idioma del navegador
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: true, // quitar en producción
    interpolation: {
      escapeValue: false, // no necesario para React
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;