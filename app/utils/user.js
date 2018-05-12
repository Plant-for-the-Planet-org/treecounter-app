import { fetchItem } from '../stores/localStorage';

export const getAccessToken = () => {
  return fetchItem('jwt')
    .then(token => token)
    .catch(err => console.log(err));
};
