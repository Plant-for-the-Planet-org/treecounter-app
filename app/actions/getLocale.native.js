import { getLanguages } from 'react-native-i18n';

export function getLocale() {
  let locale = getLanguages().then(languages => {
    languages[0].split('-')[0]; // ['en-US', 'en']
  });
  return locale;
}
