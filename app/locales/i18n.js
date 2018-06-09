import i18next from 'i18next';
import enlabels from './en/index';

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  // Add language detector later
  lng: 'en', // 'en' | 'es'

  // Using simple hardcoded resources for simple example
  resources: {
    en: {
      translation: {
        label: enlabels
      }
    }
  }
});

export default i18next;
