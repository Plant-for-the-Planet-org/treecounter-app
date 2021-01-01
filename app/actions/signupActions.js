import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { updateRoute } from '../helpers/routerHelper';
import { postRequest } from '../utils/api';
import { updateJWT, updateActivateToken } from '../utils/user';
import { loadUserProfile } from './loadUserProfileAction';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';

export function signUp(
  profileType,
  userData,
  recaptchaToken,
  navigation = undefined
) {

  return dispatch => {
    dispatch(setProgressModelState(true));
    return postRequest(
      'signup_post',
      userData,
      { profileType: profileType, version: 'v1.5' },
      false,
      recaptchaToken
    )
      .then(res => {
        const { token, refresh_token, data } = res.data;
        if (!data.isActivated) {
          updateActivateToken(userData.email, token);
        } else {
          let navigationData = {
            ...data,
            navigation: navigation || dispatch
          }
          updateJWT(token, refresh_token);
          dispatch(loadUserProfile(navigationData));
          NotificationManager.success(
            i18n.t('label.registration_successfully'),
            i18n.t('label.congrats'),
            5000
          );
        }

        updateRoute(
          data.routeName,
          navigation || dispatch,
          null,
          data.routeParams
        );
        dispatch(setProgressModelState(false));
        return res;
      })
      .catch(err => {
        dispatch(setProgressModelState(false));
        throw err;
      });
  };

}

export function accountActivate(token) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return postRequest('auth_accountActivate_post', { token: token })
      .then(res => {
        const { token, refresh_token, data } = res.data;
        updateJWT(token, refresh_token);
        let navigationData = {
          navigation: dispatch
        }
        dispatch(loadUserProfile(navigationData));
        if (data.routeName !== 'app_userHome') {
          updateRoute(data.routeName, dispatch, null, data.routeParams);
        } else {
          updateRoute('app_accountActivated', dispatch, null, null);
        }
        dispatch(setProgressModelState(false));
        return res;
      })
      .catch(err => {
        dispatch(setProgressModelState(false));
        throw err;
      });
  };
}
