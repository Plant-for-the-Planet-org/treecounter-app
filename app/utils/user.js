import jwtDecode from 'jwt-decode';
import { auth0NewAccessToken } from '../actions/auth0Actions';
import { debug } from '../debug';
import { getItem, saveItem } from '../stores/localStorage';
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
    const prev_refresh_token = await getItem('refresh_token');
    if (prev_refresh_token) {
      let response = await postRequest('gesdinet_jwt_refresh_token', {
        refresh_token: prev_refresh_token
      });
      if (response.data) {
        const newToken = response.data.token;
        // refresh_token does not seem to be part of the result of api/token/refresh any more
        const refreshToken = response.data.refresh_token || prev_refresh_token;
        updateJWT(newToken, refreshToken);
        return newToken;
      }
    }
  }
  return;
};

/**
 * Returns a boolean value [true] if token is expired else returns [false]
 * @param {boolean} isAuth0 - gets result for auth0 token if [true]. Defaults to [false]
 */
const tokenIsExpired = async (isAuth0 = false) => {
  let tokenExpiry = await getTokenExpires(isAuth0);
  let expired = getCurrentUnixTimestamp() > tokenExpiry;
  return expired;
};

const getTokenExpires = async isAuth0 => {
  let tokenExpiryTime;
  if (isAuth0) {
    tokenExpiryTime = await getItem('auth0_token_expires');
  } else {
    tokenExpiryTime = await getItem('token_expires');
  }
  if (tokenExpiryTime) {
    return parseInt(tokenExpiryTime);
  } else {
    return 0;
  }
};

const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);

/**
 * @returns string | null
 */
export const getAuth0AccessToken = async () => {
  const token = await getItem('auth0_token');
  if (token) {
    // This may throw an Error if localStorage is broken
    // or POST requests timeout
    try {
      const newToken = await refreshAuth0TokenIfExpired();
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

/**
 * @returns string | void
 */
const refreshAuth0TokenIfExpired = async () => {
  if (await tokenIsExpired(true)) {
    const prev_refresh_token = await getItem('auth0_refresh_token');
    if (prev_refresh_token) {
      const credentials = await auth0NewAccessToken(prev_refresh_token);
      if (credentials) {
        const { accessToken, idToken, refreshToken } = credentials;
        updateAuth0JWT(accessToken, refreshToken, idToken);
        return accessToken;
      }
    }
  }
  return;
};

// Accepts 3 parameters -
// token - this is the access_token from Auth0
// refresh_token - this is refresh token
// id_token - this is the idToken used to get the expriration time
export const updateAuth0JWT = (token, refreshToken, idToken) => {
  saveItem('auth0_token', token);
  // adds refreshToken to storage, if present
  if (refreshToken) {
    saveItem('auth0_refresh_token', refreshToken);
  }
  if (idToken) {
    saveItem('auth0_token_expires', `${getExpirationTimeStamp(idToken)}`);
  } else {
    saveItem('auth0_token_expires', `${getExpirationTimeStamp(token)}`);
  }
  return;
};

/**
 * @returns string | null
 */
export const getEmail = async () => {
  const email = await getItem('email');
  return email;
};

// Store registration mail
// email - this is the email the user registered with
export const updateEmail = (email) => {
  saveItem('email', email);
  return;
};

