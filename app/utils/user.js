import { fetchItem } from '../stores/localStorage';

export function getAccessToken() {
  let token = fetchItem('jwt');

  if (!token) {
    return null;
  }

  return token;
}
