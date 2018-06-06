import { putAuthenticatedRequest } from '../utils/api';
import { debug } from '../debug/index';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';

const profileTypeToReq = {
  profile: 'profile_put',
  about_me: 'profileAboutMe_put',
  password: 'profilePassword_put',
  image: 'profileImage_put'
};
export function updateUserProfile(data, profileType) {
  return () => {
    putAuthenticatedRequest(profileTypeToReq[profileType], data)
      .then(res => {
        debug(res.status);
        NotificationManager.success(
          `${profileType} Updated Successful`,
          `Congrats`,
          5000
        );
      })
      .catch(err => {
        debug(err);
        NotificationManager.error(err.message, 'Profile update Error', 5000);
      });
  };
}
