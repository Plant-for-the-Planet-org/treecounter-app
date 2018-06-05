import { postRequest } from '../utils/api';
import { debug } from '../debug/index';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';

export function updateUserProfile(data) {
  return () => {
    postRequest('auth_forgotPassword_post', data)
      .then(res => {
        debug(res.status);
        NotificationManager.success(
          'Profile Updated Successful',
          'Congrats',
          5000
        );
      })
      .catch(err => {
        debug(err);
        NotificationManager.error(err.message, 'Profile update Error', 5000);
      });
  };
}
