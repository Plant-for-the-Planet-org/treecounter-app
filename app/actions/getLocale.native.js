import { getLanguages } from 'react-native-i18n';
import en from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';

let cache = { locale: undefined };

export const supportedLocales = ['en', 'de'];
export const defaultLocale = 'en';
export const localeObjects = { en: en, de: de };

/**
 * Call this when the app starts up
 * so that locale is cached. Most important
 * on react-native where getting languages is slower.
 */
export async function initLocale() {
  cache.locale = await guessLocale();
}

export function getLocale() {
  // console.log('getLocale', cache.locale);
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
