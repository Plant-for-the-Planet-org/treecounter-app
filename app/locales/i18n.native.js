import i18next from 'i18next';
import { getLanguages } from 'react-native-i18n';
import enlabels from './en';
import deLabels from './de';
import esLabels from './es';
import frLabels from './fr';
import itLabels from './it';
import ptLabels from './pt';
import ptBRLabels from './pt-BR';
import { supportedLocales, defaultLocale } from '../actions/getLocale';

// TO-DO: consider changing this the same way as i18n.js using getLocale()
//        but i18next.changeLanguage need to be called async
let userLang = undefined;
getLanguages().then(languages => {
  userLang = languages[0]; // ['en-US', 'en']
  if (!supportedLocales.includes(userLang)) {
    userLang = userLang.split('-')[0];
  }
  if (!supportedLocales.includes(userLang)) {
    userLang = defaultLocale;
  }
  i18next.changeLanguage(userLang); // ['en-US', 'en']
});

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  // Add language detector later
  lng: userLang, // 'en' | 'es',
  fallbackLng: defaultLocale,

  // Using simple hardcoded resources for simple example
  resources: {
    'en': {
      translation: {
        label: enlabels
      }
    },
    'de': {
      translation: {
        label: deLabels
      }
    },
    'es': {
      translation: {
        label: esLabels
      }
    },
    'fr': {
      translation: {
        label: frLabels
      }
    },
    'it': {
      translation: {
        label: itLabels
      }
    },
    'pt': {
      translation: {
        label: ptLabels
      }
    },
    'pt-BR': {
      translation: {
        label: ptBRLabels
      }
    }
  }
});

export default i18next;
