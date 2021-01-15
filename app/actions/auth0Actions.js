import Config from 'react-native-config';
import Auth0 from 'react-native-auth0';
import { updateAuth0JWT } from '../utils/user';
import { updateRoute } from '../helpers/routerHelper/routerHelper.native';

// AUTH0 CONFIG
const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

//  ---------------- AUTH0 ACTIONS START----------------

export function auth0Login(email, navigation) {
  // Function for getting code
  auth0.auth
    .passwordlessWithEmail({
      email: email,
      send: 'code',
    })
    .then(() => {
      updateRoute('app_otp', navigation, null, { email: email })
      // return res;
    })
    .catch(error => {
      throw error;
    });
}

export function auth0OTP(email, code) {
  // Function for getting access token
  return auth0.auth
    .loginWithEmail({
      email: email,
      code: code,
    })
    .then((credentials) => {
      const { accessToken, idToken, refreshToken } = credentials;
      updateAuth0JWT(accessToken, refreshToken, idToken);
      return credentials;
    })
    .catch(error => {
      throw error;
    });
}

export const auth0Logout = () => {
  return new Promise((resolve, reject) => {
    auth0.webAuth
      .clearSession()
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
