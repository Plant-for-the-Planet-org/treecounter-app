import jwtDecode from 'jwt-decode';

import { postRequest } from './api';

export const getJWT = () =>
  new Promise(function(resolve) {
    const token = window.localStorage.getItem('token');
    if (null === token) {
      resolve(null);
    } else if (tokenIsExpired(token)) {
      const refresh_token = window.localStorage.getItem('refresh_token');
      postRequest('gesdinet_jwt_refresh_token', { refresh_token })
        .then(response => {
          const { token, refresh_token } = response.data;
          updateJWT(token, refresh_token);
          resolve(token);
        })
        .catch(() => resolve(null));
    } else {
      resolve(token);
    }
  });

export const updateJWT = (token, refresh_token) => {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('refresh_token', refresh_token);
  window.localStorage.setItem('token_expires', getExpirationTimeStamp(token));
};

export const clearJWT = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refresh_token');
  window.localStorage.removeItem('token_expires');
};

const getExpirationTimeStamp = token => {
  const { iat, exp } = jwtDecode(token);
  return getCurrentUnixTimestamp() + exp - iat;
};

const tokenIsExpired = () => getCurrentUnixTimestamp() > getTokenExpires();

const getTokenExpires = () => window.localStorage.getItem('token_expires');

const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);
