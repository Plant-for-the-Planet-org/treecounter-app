import i18next from 'i18next';
import labels from './en/labels';
import deLabels from './de/labels';

let userLang = navigator.language || navigator.userLanguage;
console.log('**************', userLang);

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  // Add language detector later
  // lng: 'en', // 'en' | 'es'
  lng: 'de', // just to test
  //lng: userLang    otherwise..

  // Using simple hardcoded resources for simple example
  resources: {
    en: {
      translation: {
        label: labels
      }
    },
    de: {
      translation: {
        label: deLabels
      }
    }
  }
});

export default i18next;
