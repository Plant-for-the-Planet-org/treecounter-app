import jwtDecode from 'jwt-decode';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { updateRoute } from '../helpers/routerHelper';
import { setUserLogIn, setUserLogOut } from '../reducers/authenticationReducer';
import { loadLoginData } from './loadLoginData';
import { debug } from '../debug/index';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { saveItem, fetchItem, clearStorage } from '../stores/localStorage';
import { postRequest, postAuthenticatedRequest } from '../utils/api';

export function login(data) {
  const request = postRequest('api_login_check', data);

  return dispatch => {
    request
      .then(res => {
        const token = res.data.token;
        if (fetchItem('jwt') !== token) {
          saveItem('jwt', token);
        }
        // merge token data and custom data
        const payload = {
          token,
          user: { ...jwtDecode(token), ...res.data.data }
        };
        dispatch(setUserLogIn(payload));

        NotificationManager.success('Login Successful', 'Welcome', 5000);
        updateRoute('app_userHome', dispatch, res.data.data.id);
        return token;
      })
      .then(() => {
        dispatch(loadLoginData());
      })
      .catch(error => {
        if (
          error !== undefined &&
          error.response !== undefined &&
          error.response.status === 401
        ) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          debug(error.response.data);
          NotificationManager.error(
            error.response.data.message,
            error.response.data.code,
            5000
          );
        } else {
          NotificationManager.error(error.message, 'Login Error', 5000);
        }
      });
  };
}

export function refreshToken() {
  const request = postAuthenticatedRequest('api_token_refresh', {});

  return dispatch => {
    request
      .then(res => {
        const token = res.data.token;
        if (fetchItem('jwt') !== token) {
          saveItem('jwt', token);
        }
        // merge token data and custom data
        const payload = {
          token,
          user: { ...jwtDecode(token), ...res.data.data }
        };
        dispatch(setUserLogIn(payload));
      })
      .then(() => {
        dispatch(loadLoginData());
      })
      .catch(() => {});
  };
}

export function logoutUser() {
  return dispatch => {
    debug('Logging out');
    clearStorage();
    dispatch(setUserLogOut());
    dispatch(setCurrentUserProfileId(null));
    updateRoute('app_homepage');
  };
}

export function forgot_password(data) {
  postRequest('auth_forgotPassword_post', data)
    .then(res => {
      debug(res.status);
      NotificationManager.success(
        'Further details have been sent to your mail address'
      );
      updateRoute('app_login');
    })
    .catch(err => debug(err));
}

export function reset_password(data) {
  data.token = fetchItem('jwt');
  postRequest('auth_resetPassword_post', data)
    .then(res => {
      debug(res.status);
    })
    .catch(err => debug(err));
}
