import jwtDecode from 'jwt-decode';
import { debug } from '../debug';
import { fetchItem, getItem, saveItem } from '../stores/localStorage';
import { postRequest } from './api';

/**
 * @returns string | null
 */
export const getAccessToken = async () => {
  const token = await getItem('token');
  if (token) {
    // This may throw an Error if localStorage is broken
    // or POST requests timeout
    try {
      const newToken = await refreshTokenIfExpired();
      if (newToken) {
        return newToken;
      }
    } catch (error) {
      // 400
      debug(`Failed to refresh token: ${error}`);
      return;
    }
  }
  return token;
};

export const updateJWT = (token, refresh_token) => {
  saveItem('token', token);
  saveItem('refresh_token', refresh_token);
  saveItem('token_expires', `${getExpirationTimeStamp(token)}`);
  return;
};

export const updateActivateToken = (email, activate_token) => {
  saveItem('activate_token', activate_token);
  saveItem('email', email);
};

const getExpirationTimeStamp = token => {
  const { iat, exp } = jwtDecode(token);
  return getCurrentUnixTimestamp() + exp - iat;
};

/**
 * @returns string | void
 */
const refreshTokenIfExpired = async () => {
  if (await tokenIsExpired()) {
    const prev_refresh_token = await fetchItem('refresh_token');
    let response = await postRequest('gesdinet_jwt_refresh_token', {
      refresh_token: prev_refresh_token
    });

    const newToken = response.data.token;
    const refreshToken = response.data.refresh_token;
    updateJWT(newToken, refreshToken);
    return newToken;
  } else {
    return;
  }
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
