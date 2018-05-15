import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';

import { updateRoute } from '../helpers/routerHelper';
import { debug } from '../debug/index';
import { postRequest } from '../utils/api';

export function signUp(profileType, userData) {
  debug(userData, profileType);
  if (userData.password.first === userData.password.second) {
    return dispatch => {
      postRequest('register_post', userData, { profileType: profileType })
        .then(res => {
          if (res.status === 200) {
            debug('registration successful');
            NotificationManager.success(
              'Registration Successful',
              'Congrats',
              5000
            );
            debug(res);
            debug(dispatch);
            updateRoute('/verify');
          }
        })
        .catch(err => console.log(err));
    };
  } else {
    window.alert('Password Invalid');
  }
}
