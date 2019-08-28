import { getLanguages } from 'react-native-i18n';

let cache = { locale: undefined };

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
  return cache.locale;
}

async function guessLocale() {
  let languages = await getLanguages();

  let locale = languages[0].split('-')[0]; // ['en-US', 'en']
  if (locale === 'en' || locale === 'de') {
    return locale;
  } else {
    return 'en';
  }
}
