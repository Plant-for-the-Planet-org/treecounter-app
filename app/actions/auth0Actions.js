import Config from 'react-native-config';
import Auth0 from 'react-native-auth0';
import {saveItem, loadState} from '../../app/stores/localStorage.native'; 
import mergeEntities from '../../app/reducers/entitiesReducer';
import { accessTokenSchema } from '../schemas';

// AUTH0 CONFIG
const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

//  ---------------- AUTH0 ACTIONS START----------------

export const auth0Login = () => {//async (dispatch) => {
  console.log('Auth0action');
  return dispatch => {
  console.log('Auth0action1');
    //return new Promise((resolve, reject) => {
      console.log('Auth0action2');
      auth0.webAuth
        .authorize({ scope: 'openid email profile' }, { ephemeralSession: true })
        .then((credentials) => {
          const { accessToken, idToken } = credentials;
          saveItem('token', accessToken);
          saveItem('id', idToken);
          dispatch(mergeEntities(normalize(accessToken, accessTokenSchema)));
          loadState();
          // resolve();
        })
        .catch((error) => {
          // reject(error);
        });
  // })       
 }
};

export const auth0Logout = () => {
    return new Promise((resolve, reject) => {
      auth0.webAuth
        .clearSession()
        .then (() => {
        resolve();})
        .catch((error) => {
        reject(error);});
    });
  };