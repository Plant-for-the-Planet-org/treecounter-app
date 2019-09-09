import LocalStorage from '../stores/localStorage';
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
  const location = window.location.href.split('/');
  const _locale = location[location.length - 1];
  const languageCached = localStorage.getItem('language');

  // order of language detection
  // 1. use language from URL if specified as _locale=de
  // 2. use default language English if URL contains ?noredirect
  // 3. use user chosen language from local storage if available
  // 4. use browser language if possible, but currently only de and en
  // 5. use English as default language
  if (_locale.includes('_locale')) {
    return _locale.split('=')[1];
  } else if (_locale.includes('?noredirect')) {
    return 'en';
  } else if (languageCached !== null) {
    return languageCached;
  } else {
    let userLang = navigator.language || navigator.userLanguage;
    let locale = userLang.split('-')[0];
    if (locale === 'en' || locale === 'de') {
      return locale;
    } else {
      return 'en';
    }
  }
}
