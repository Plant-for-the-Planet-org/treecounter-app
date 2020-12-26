import Config from 'react-native-config';
import Auth0 from 'react-native-auth0';
import { loadState } from '../stores/localStorage.native';
import { updateNewJWT } from '../utils/user';
import { updateRoute } from '../helpers/routerHelper';

// AUTH0 CONFIG
const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

//  ---------------- AUTH0 ACTIONS START----------------

export function auth0Login(navigation, isSignup) {
  const credentials = auth0.webAuth.authorize({ scope: 'openid email profile offline_access', screen_hint: isSignup ? 'signup' : 'login', }, { ephemeralSession: true });
  return credentials.then(res => {
    const { accessToken, idToken, refreshToken } = res;
    updateNewJWT(accessToken, refreshToken, idToken);
    updateRoute('app_userHome', navigation);
  })
    .catch(err => {
      throw err;
    });
}

export function auth0Signup() {
  auth0.webAuth.authorize({ scope: 'openid email profile offline_access' }, { ephemeralSession: true })
    .then((credentials) => {
      const { accessToken, idToken } = credentials;
      handleAccessToken(accessToken);
      loadState();
    })
    .catch((error) => {
      console.log('error', error);
    });
}

export const auth0Logout = () => {
  return new Promise((resolve, reject) => {
    auth0.webAuth
      .clearSession()
      .then(() => {
      })
      .catch((error) => {
        reject(error);
      });
  });
};