let cache = { locale: undefined };

/**
 * Call this when the app starts up
 * so that locale is cached. Most important
 * on react-native where getting languages is slower.
 */
export function initLocale() {
  cache.locale = guessLocale();
}

export function getLocale() {
  // console.log('getLocale', cache.locale);
  if (!cache.locale) {
    initLocale();
  }
  return cache.locale;
}

function guessLocale() {
  let userLang = navigator.language || navigator.userLanguage;
  let locale = userLang.split('-')[0];
  if (locale === 'en' || locale === 'de') {
    return locale;
  } else {
    return 'en';
  }
}
