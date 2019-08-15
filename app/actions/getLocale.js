export function getLocale() {
  let userLang = navigator.language || navigator.userLanguage;
  let locale = userLang.split('-')[0];
  if (locale === 'en' || locale === 'de') {
    return locale;
  } else {
    return 'en';
  }
}
