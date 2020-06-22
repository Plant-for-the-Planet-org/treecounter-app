import { updateRoute } from '../helpers/routerHelper';
import { loadUserProfile } from './loadUserProfileAction';
import { debug } from '../debug';
import { createAction } from 'redux-actions';
import { clearStorage } from '../stores/localStorage';
import { postRequest, postActivateLinkRequest } from '../utils/api';
import { updateJWT, updateActivateToken } from '../utils/user';
import { NotificationAction } from './notificationAction';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import i18n from '../locales/i18n.js';
export const userLogout = createAction('USER_LOGOUT');

export function login(credentials, recaptchaToken, navigation = undefined) {
  const request = postRequest(
    'api_login_check',
    credentials,
    null,
    false,
    recaptchaToken
  );

  return dispatch => {
    dispatch(setProgressModelState(true));
    return request
      .then(res => {
        const { token, refresh_token, data } = res.data;
        if (!data.isActivated) {
          // eslint-disable-next-line no-underscore-dangle
          updateActivateToken(credentials._username, token);
        } else {
          updateJWT(token, refresh_token);
          dispatch(setProgressModelState(false));
          dispatch(loadUserProfile(data));
          dispatch(setProgressModelState(true));
          dispatch(NotificationAction());
        }
        //On App it is causing crash or undefined behavior
        //May be Dispatch load user profile and Update route causing some issue in
        //App Drawer Navigator , for now putting a 0 sec timeout to delay the this until store gets updated
        //We require this updateRuute if server sent route name in response like activation screen else we can ignore this
        setTimeout(
          () =>
            updateRoute(
              data.routeName,
              navigation || dispatch,
              null,
              data.routeParams
            ),
          1000
        );
        dispatch(setProgressModelState(false));
        return res;
      })
      .catch(err => {
        dispatch(setProgressModelState(false));
        NotificationManager.error(
          err.response.data ? err.response.data.message : i18n.t('label.error'),
          i18n.t('label.error'),
          5000
        );
        throw err;
      });
  };
}

export function logoutUser() {
  return dispatch => {
    clearStorage();
    dispatch(userLogout());
  };
}

export function forgot_password(data, navigation = undefined) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return postRequest('auth_forgotPassword_post', data)
      .then(res => {
        dispatch(setProgressModelState(false));
        updateRoute('app_passwordSent', navigation || dispatch);
        return res;
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
        NotificationManager.error(
          err.response.data ? err.response.data.message : i18n.t('label.error'),
          i18n.t('label.error'),
          5000
        );
        throw err;
      });
  };
}

export function sendEmail(/* navigation = undefined */) {
  return (/* dispatch */) => {
    postActivateLinkRequest('auth_sendActivationLink_post')
      .then((/* res */) => {
        // debug(res);
      })
      .catch(err => debug(err));
  };
}

export function reset_password(data, navigation = undefined) {
  return dispatch => {
    return postRequest('auth_resetPassword_post', data)
      .then((/* res */) => {
        updateRoute('app_login', navigation || dispatch);
      })
      .catch(err => {
        debug(err);
        throw err;
      });
  };
}
export function setAccessDenied(data, params, path, navigation = undefined) {
  return dispatch => {
    postRequest('public_accessDenied', data, params)
      .then((/* res */) => {
        // const { statusText } = res;
        updateRoute(path, navigation || dispatch);
        // NotificationManager.success(statusText, i18n.t('label.success'), 5000);
      })
      .catch(error => {
        debug(error);
        // NotificationManager.error(error.response.data ? error.response.data.message : i18n.t('label.error'), i18n.t('label.error'), 5000);
      });
  };
}
