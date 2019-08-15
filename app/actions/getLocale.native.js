import { getLanguages } from 'react-native-i18n';

export async function getLocale() {
  let locale = await getLanguages().then(languages => {
    return languages[0].split('-')[0]; // ['en-US', 'en']
  });
  if (locale === 'en' || locale === 'de') {
    return locale;
  } else {
    return 'en';
  }
}
