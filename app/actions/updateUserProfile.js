import {
  putAuthenticatedRequest,
  deleteAuthenticatedRequest
} from '../utils/api';
import { debug } from '../debug/index';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { userProfileSchema } from '../schemas/index';

import { normalize } from 'normalizr';
import { mergeEntities } from '../reducers/entitiesReducer';

const profileTypeToReq = {
  profile: 'profile_put',
  about_me: 'profileAboutMe_put',
  password: 'profilePassword_put',
  image: 'profileImage_put'
};
export function deleteTpoProject(plantId) {
  return () => {
    return new Promise(function(resolve) {
      deleteAuthenticatedRequest('plantProject_delete', {
        plantProject: plantId
      })
        .then(res => {
          debug(res.status);
          debug(res);
          // if (res.data && res.data instanceof Object) {
          //   dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          // }
          NotificationManager.success(
            `plant Project Updated Successful`,
            `Congrats`,
            5000
          );
          resolve(res.data);
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, 'Profile update Error', 5000);
        });
    });
  };
}
export function updateTpoProject(plantProject, projectId) {
  return dispatch => {
    return new Promise(function(resolve) {
      putAuthenticatedRequest('plantProject_put', plantProject, {
        plantProject: projectId
      })
        .then(res => {
          debug(res.status);
          debug(res);
          if (res.data && res.data instanceof Object) {
            dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          }
          NotificationManager.success(
            `plant Project Updated Successful`,
            `Congrats`,
            5000
          );
          resolve(res.data);
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(
            err.message,
            'plant Project update Error',
            5000
          );
        });
    });
  };
}
export function updateUserProfile(data, profileType) {
  return dispatch => {
    return new Promise(function(resolve) {
      putAuthenticatedRequest(profileTypeToReq[profileType], data)
        .then(res => {
          debug(res.status);
          debug(res);
          if (res.data && res.data instanceof Object) {
            dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          }
          NotificationManager.success(
            `${profileType} Updated Successful`,
            `Congrats`,
            5000
          );
          resolve(res.data);
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, 'Profile update Error', 5000);
        });
    });
  };
}
