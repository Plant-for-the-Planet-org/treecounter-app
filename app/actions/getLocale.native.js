import { getLanguages } from 'react-native-i18n';
import en from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';
import es from 'date-fns/locale/es';
// import { debug } from '../debug';

let cache = { locale: undefined };

export const supportedLocales = ['en', 'de', 'es'];
export const defaultLocale = 'en';
export const localeObjects = { en: en, de: de , es: es };

/**
 * Call this when the app starts up
 * so that locale is cached. Most important
 * on react-native where getting languages is slower.
 */
export async function initLocale() {
  cache.locale = await guessLocale();
}

export async function getLocaleAsync() {
  // debug('getLocale', cache.locale);
  if (!cache.locale) {
    await initLocale();
  }
  return cache.locale;
}

export function getLocale() {
  // debug('getLocale', cache.locale);
  if (!cache.locale) {
    initLocale();
  }
  return cache.locale;
}

async function guessLocale() {
  let languages = await getLanguages();

  let locale = languages[0].split('-')[0]; // ['en-US', 'en']
  if (supportedLocales.includes(locale)) {
    return locale;
  } else {
    return defaultLocale;
  }
}
