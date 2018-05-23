import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';

import { updateRoute } from '../helpers/routerHelper';
import { debug } from '../debug/index';
import { postRequest } from '../utils/api';
import { updateJWT } from '../utils/user';
import { loadLoginData } from './loadLoginData';

export function signUp(profileType, userData) {
  debug(userData, profileType);
  if (userData.password.first === userData.password.second) {
    return dispatch => {
      postRequest('signup_post', userData, { profileType: profileType })
        .then(res => {
          const { token, refresh_token } = res.data;
          updateJWT(token, refresh_token);
          dispatch(loadLoginData());
          debug('registration successful');
        })
        .then(() => {
          NotificationManager.success(
            'Registration Successful',
            'Congrats',
            5000
          );
          updateRoute('app_userHome', dispatch);
        })
        .catch(err => console.log(err));
    };
  } else {
    window.alert('Password Invalid');
  }
}
