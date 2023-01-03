import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';
import fr from './fr.json';


i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        ar: ar,
        en: en,
        fr: fr,
    },
    interpolation: {
        escapeValue: false
    }
});

export default i18n;