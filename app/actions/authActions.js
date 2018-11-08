import { updateRoute } from '../helpers/routerHelper';
import { loadUserProfile } from './loadUserProfileAction';
import { debug } from '../debug/index';
import { createAction } from 'redux-actions';
import { clearStorage } from '../stores/localStorage';
import { postRequest, postActivateLinkRequest } from '../utils/api';
import { updateJWT, updateActivateToken } from '../utils/user';
import { NotificationAction } from './notificationAction';
import { loadTpos } from './loadTposAction';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import _ from 'lodash';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
export const userLogout = createAction('USER_LOGOUT');

export function login(credentials, navigation = undefined) {
  const request = postRequest('api_login_check', credentials);

  return dispatch => {
    dispatch(setProgressModelState(true));
    request
      .then(res => {
        const { token, refresh_token, data } = res.data;
        if (data.routeName === 'app_accountActivation') {
          updateActivateToken(credentials._username, token);
        } else {
          updateJWT(token, refresh_token);
          dispatch(loadUserProfile());
          dispatch(NotificationAction());
        }
        updateRoute(
          data.routeName,
          navigation || dispatch,
          null,
          data.routeParams
        );
        _.delay(() => dispatch(setProgressModelState(false)), 1000);
        return token;
      })
      .catch(err => {
        dispatch(setProgressModelState(false));
      });
  };
}

export function logoutUser() {
  return dispatch => {
    clearStorage();
    dispatch(userLogout());
    dispatch(loadTpos());
  };
}

export function forgot_password(data) {
  return dispatch => {
    postRequest('auth_forgotPassword_post', data)
      .then(res => {
        updateRoute('app_passwordSent', dispatch);
      })
      .catch(err => debug(err));
  };
}

export function sendEmail() {
  return dispatch => {
    postActivateLinkRequest('auth_sendActivationLink_post')
      .then(res => {
        updateRoute('app_login', dispatch);
      })
      .catch(err => debug(err));
  };
}

export function reset_password(data) {
  return dispatch => {
    postRequest('auth_resetPassword_post', data)
      .then(res => {
        updateRoute('app_login', dispatch);
      })
      .catch(err => debug(err));
  };
}
export function setAccessDenied(data, params, path) {
  return dispatch => {
    postRequest('public_accessDenied', data, params)
      .then(res => {
        const { statusText } = res;
        updateRoute(path, dispatch);
        NotificationManager.success(statusText, 'Success', 5000);
      })
      .catch(error => {
        // NotificationManager.error(error.response.data.message, 'Error', 5000);
      });
  };
}
