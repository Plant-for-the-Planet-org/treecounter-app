import i18next from 'i18next';
import enlabels from './en';
import deLabels from './de';
import esLabels from './es';
import ptLabels from './pt';
import ptBRLabels from './pt-BR';
import { getLocale } from '../actions/getLocale';

let userLang = getLocale();
i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  // Add language detector later
  lng: userLang, // 'en' | 'es'

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
