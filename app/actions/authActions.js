import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { updateRoute } from '../helpers/routerHelper';
import { loadUserProfile } from './loadUserProfileAction';
import { debug } from '../debug/index';
import { userLogout } from '../reducers/reducer';

import { clearStorage } from '../stores/localStorage';
import { postRequest } from '../utils/api';
import { updateJWT } from '../utils/user';
import { NotificationAction } from './notificationAction';
import { loadTpos } from './loadTposAction';

export function login(data) {
  const request = postRequest('api_login_check', data);

  return dispatch => {
    request.then(res => {
      const { token, refresh_token } = res.data;
      updateJWT(token, refresh_token);
      dispatch(loadUserProfile());
      dispatch(NotificationAction());
      updateRoute('app_userHome', dispatch);
      return token;
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

export function reset_password(data) {
  return dispatch => {
    postRequest('auth_resetPassword_post', data)
      .then(res => {
        updateRoute('app_login', dispatch);
      })
      .catch(err => debug(err));
  };
}
