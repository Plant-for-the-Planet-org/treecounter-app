import { NotificationManager } from 'react-notifications';

import { debug } from '../debug/index';
import { postRequest } from '../utils/api';

export function userSignupRequest(userData, profileType) {
  debug(userData, profileType);
  if (userData.password.first === userData.password.second) {
    return postRequest('register_post', userData, { profileType: profileType })
      .then(res => {
        if (res.status === 200) {
          debug('registration successful');
          NotificationManager.success(
            'Registration Successful',
            'Congrats',
            5000
          );
          debug(res);
          history.push('/verify');
        }
      })
      .catch(err => console.log(err));
  } else {
    window.alert('Password Invalid');
  }
}
