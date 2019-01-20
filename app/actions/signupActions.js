import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';

import { updateRoute } from '../helpers/routerHelper';
import { postRequest } from '../utils/api';
import { updateJWT, updateActivateToken } from '../utils/user';
import { loadUserProfile } from './loadUserProfileAction';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function signUp(profileType, userData) {
  if (userData.password.first === userData.password.second) {
    return dispatch => {
      dispatch(setProgressModelState(true));
      return postRequest('signup_post', userData, { profileType: profileType })
        .then(res => {
          const { token, refresh_token, data } = res.data;
          if (!data.isActivated) {
            updateActivateToken(userData.email, token);
          } else {
            updateJWT(token, refresh_token);
            dispatch(loadUserProfile(data));
            NotificationManager.success(
              'Registration Successful',
              'Congrats',
              5000
            );
          }

          updateRoute(data.routeName, dispatch, null, data.routeParams);
          dispatch(setProgressModelState(false));
          return res;
        })
        .catch(err => {
          console.log(err);
          dispatch(setProgressModelState(false));
          throw err;
        });
    };
  } else {
    window.alert('Password do not match');
  }
}

export function accountActivate(token) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return postRequest('auth_accountActivate_post', { token: token })
      .then(res => {
        const { token, refresh_token, data } = res.data;
        updateJWT(token, refresh_token);
        dispatch(loadUserProfile());
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
