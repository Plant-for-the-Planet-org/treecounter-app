import { getItem, saveItem } from '../stores/localStorage';

const KEY = 'auth0token';

/**
 * Save the JWT token that Auth0 supplies.
 *
 * This can be used for authentication against our own backend API.
 * When decoded it contains user profile and a unique identifier: "sub"
 *
 * @param {str} token JWT token that Auth0 supplied
 */
export const setAuth0Token = async token => saveItem(KEY, token);

export const getAuth0Token = async () => getItem(KEY);
