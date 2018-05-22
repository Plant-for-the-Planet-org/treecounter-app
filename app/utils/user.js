import { fetchItem, saveItem } from '../stores/localStorage';
import jwtDecode from 'jwt-decode';
import { postRequest } from './api';

export const getAccessToken = () => {
  return fetchItem('token')
    .then(async token => {
      let expired = await tokenIsExpired();
      if (expired) {
        const prev_refresh_token = await fetchItem('refresh_token');
        const response = await postRequest('gesdinet_jwt_refresh_token', {
          refresh_token: prev_refresh_token
        });
        const { token, refresh_token } = response.data;
        updateJWT(token, refresh_token);
        return token;
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
  return;
};

const getExpirationTimeStamp = token => {
  const { iat, exp } = jwtDecode(token);
  return getCurrentUnixTimestamp() + exp - iat;
};

const tokenIsExpired = async () => {
  let tokenExpiry = await getTokenExpires();
  let expired = getCurrentUnixTimestamp() > tokenExpiry;
  return expired;
};

const getTokenExpires = async () => {
  let tokenExpiryTime = await fetchItem('token_expires');
  return parseInt(tokenExpiryTime);
};

const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);
