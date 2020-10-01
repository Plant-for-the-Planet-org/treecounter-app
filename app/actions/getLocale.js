import { getItemSync } from '../stores/localStorage';
import en from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import it from 'date-fns/locale/it';
import pt from 'date-fns/locale/pt';
import ptBR from 'date-fns/locale/pt-BR';
// import and register all locales used for 'react-datepicker'
import { registerLocale } from 'react-datepicker';
// import { debug } from '../debug';

let cache = { locale: undefined };

// TODO: activate 'pt' here
//export const supportedLocales = ['en', 'de', 'es', 'fr', 'it', 'pt', 'pt-BR'];
export const supportedLocales = ['en', 'de', 'es', 'fr', 'it', 'pt-BR'];
export const defaultLocale = 'en';
export const localeObjects = { 'en': en, 'de': de , 'es': es , 'fr': fr , 'it': it, 'pt': pt , 'pt-BR': ptBR };

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
  //debug('getLocale', cache.locale);
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
    let locale = navigator.language || navigator.userLanguage;
    // if not supported long locale format, e.g. en-US try short version, e.g. en
    if (!supportedLocales.includes(locale)) {
      locale = locale.split('-')[0];
    }
    if (supportedLocales.includes(locale)) {
      return locale;
    } else {
      return defaultLocale;
    }
  }
}
