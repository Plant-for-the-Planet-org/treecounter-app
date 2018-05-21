import i18next from 'i18next';
import labels from './en/labels';

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
        label: labels
      }
    }
  }
});

export default i18next;
