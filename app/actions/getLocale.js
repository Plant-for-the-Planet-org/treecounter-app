import { getItemSync } from '../stores/localStorage';
import en from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';
// import and register all locales used for 'react-datepicker'
import { registerLocale } from 'react-datepicker';
// import { debug } from '../debug';

let cache = { locale: undefined };

export const supportedLocales = ['en', 'de'];
export const defaultLocale = 'en';
export const localeObjects = { en: en, de: de };

/**
 * Call this when the app starts up
 * so that locale is cached. Most important
 * on react-native where getting languages is slower.
 */
export function initLocale() {
  cache.locale = guessLocale();
  registerLocale(cache.locale, localeObjects[cache.locale]);
}

// this is just to be compatible with getLocale.native.js
export function getLocaleAsync() {
  return getLocale();
}

export function getLocale() {
  // debug('getLocale', cache.locale);
  if (!cache.locale) {
    initLocale();
  }
  return cache.locale;
}

function guessLocale() {
  const location = window.location.href.split('/');
  const location_locale = location[location.length - 1];
  const languageCached = getItemSync('language');

  // order of language detection
  // 1. use language from URL if specified as _locale=de // if not in ['en','de'] we set as 'en'
  // 2. use default language English if URL contains ?noredirect
  // 3. use user chosen language from local storage if available
  // 4. use browser language if possible, but currently only de and en
  // 5. use English as default language
  if (location_locale.includes('_locale')) {
    const tempLocale = location_locale.split('=')[1];
    return supportedLocales.includes(tempLocale) ? tempLocale : 'en';
  } else if (location_locale.includes('?noredirect')) {
    return defaultLocale;
  } else if (languageCached !== null) {
    return languageCached;
  } else {
    let userLang = navigator.language || navigator.userLanguage;
    let locale = userLang.split('-')[0];
    if (supportedLocales.includes(locale)) {
      return locale;
    } else {
      return defaultLocale;
    }
  }
}
