import Config from 'react-native-config';
import Auth0 from 'react-native-auth0';
import { loadState } from '../stores/localStorage.native';
import { updateNewJWT } from '../utils/user';
import { updateRoute } from '../helpers/routerHelper';

// AUTH0 CONFIG
const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

//  ---------------- AUTH0 ACTIONS START----------------

export function auth0Login(isSignup) {
  const credentials = auth0.webAuth.authorize({ scope: 'openid email profile offline_access', screen_hint: isSignup ? 'signup' : 'login', }, { ephemeralSession: true });
  return credentials.then(res => {
    const { accessToken, idToken, refreshToken } = res;
    updateNewJWT(accessToken, refreshToken, idToken);
    return res;
  })
    .catch(err => {
      throw err;
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