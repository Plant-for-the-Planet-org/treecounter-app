import jwtDecode from 'jwt-decode';

import { fetchItem, getItem, saveItem } from '../stores/localStorage';
import { postRequest } from './api';

/**
 * Get the JWT token that the backend API issued.
 *
 * When using Auth0
 * @returns string | null
 */
export const getAccessToken = async () => {
  const token = await getItem('token');
  if (token) {
    // This may throw an Error if localStorage is broken
    // or POST requests timeout
    const newToken = await refreshTokenIfExpired();
    if (newToken) {
      return newToken;
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
    let response;
    try {
      response = await postRequest('gesdinet_jwt_refresh_token', {
        refresh_token: prev_refresh_token
      });
    } catch (error) {
      // 400
      console.log(`Failed to refresh token: ${error}`);
      return;
    }

    const newToken = response.data.token;
    const refreshToken = response.data.refresh_token;
    updateJWT(newToken, refreshToken);
    return newToken;
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

/**
 * Save the JWT token that Auth0 supplies.
 *
 * This can be used for authentication against our own backend API.
 * When decoded it contains user profile and a unique identifier: "sub"
 *
 * @param {str} token JWT token that Auth0 supplied
 */
export const setAuth0Token = async token => {
  saveItem('auth0token', token);
};

export const getAuth0Token = async () => getItem('auth0token');
