import { fetchItem, saveItem } from '../stores/localStorage';
import jwtDecode from 'jwt-decode';
import { postRequest } from './api';

export const getAccessToken = () => {
  return fetchItem('token')
    .then(async token => {
      if (tokenIsExpired()) {
        const refresh_token = await fetchItem('refresh_token');
        postRequest('gesdinet_jwt_refresh_token', { refresh_token }).then(
          response => {
            const { token, refresh_token } = response.data;
            updateJWT(token, refresh_token);
            return token;
          }
        );
      } else {
        return token;
      }
    })
    .catch(err => console.log(err));
};

export const updateJWT = (token, refresh_token) => {
  saveItem('token', token);
  saveItem('refresh_token', refresh_token);
  saveItem('token_expires', `${getExpirationTimeStamp(token)}`);
};

const getExpirationTimeStamp = token => {
  const { iat, exp } = jwtDecode(token);
  return getCurrentUnixTimestamp() + exp - iat;
};

const tokenIsExpired = () => getCurrentUnixTimestamp() > getTokenExpires();

const getTokenExpires = () => parseInt(fetchItem('token_expires'));

const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);
