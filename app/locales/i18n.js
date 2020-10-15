import i18next from 'i18next';
import enLabels from './en';
import deLabels from './de';
import esLabels from './es';
import frLabels from './fr';
import itLabels from './it';
import ptLabels from './pt';
import ptBRLabels from './pt-BR';
import enCountries from './en/country.json';
import deCountries from './de/country.json';
import esCountries from './es/country.json';
import frCountries from './fr/country.json';
import itCountries from './it/country.json';
import ptCountries from './pt/country.json';
import ptBRCountries from './pt-BR/country.json';

import { getLocale, defaultLocale } from '../actions/getLocale';

let userLang = getLocale();

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  // Add language detector later
  lng: userLang, // 'en' | 'es'
  fallbackLng: defaultLocale,

  // Using simple hardcoded resources for simple example
  resources: {
    'en': {
      translation: {
        label: enLabels,
        country: enCountries
      }
    },
    'de': {
      translation: {
        label: deLabels,
        country: deCountries
      }
    },
    'es': {
      translation: {
        label: esLabels,
        country: esCountries
      }
    },
    'fr': {
      translation: {
        label: frLabels,
        country: frCountries
      }
    },
    'it': {
      translation: {
        label: itLabels,
        country: itCountries
      }
    },
    'pt': {
      translation: {
        label: ptLabels,
        country: ptCountries
      }
    },
    'pt-BR': {
      translation: {
        label: ptBRLabels,
        country: ptBRCountries
      }
    }
  }
});

i18next.changeLanguage(userLang); // ['en-US', 'en']

export default i18next;
