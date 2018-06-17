import {
  putAuthenticatedRequest,
  deleteAuthenticatedRequest,
  postAuthenticatedRequest
} from '../utils/api';
import { debug } from '../debug/index';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { userProfileSchema, plantProjectSchema } from '../schemas/index';

import { normalize } from 'normalizr';
import { deleteEntity, mergeEntities } from '../reducers/entitiesReducer';

const profileTypeToReq = {
  profile: 'profile_put',
  about_me: 'profileAboutMe_put',
  password: 'profilePassword_put',
  image: 'profileImage_put'
};

export function addPlantProject(plantProject) {
  return dispatch => {
    return new Promise(function(resolve) {
      postAuthenticatedRequest('plantProject_post', plantProject)
        .then(res => {
          debug(res.status);
          debug(res);
          if (res.data && res.data instanceof Object) {
            dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          }
          NotificationManager.success(
            `New Project Added Successfully`,
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

export function deletePlantProject(plantProjectId) {
  return dispatch => {
    return new Promise(function(resolve) {
      deleteAuthenticatedRequest('plantProject_delete', {
        plantProject: plantProjectId
      })
        .then(res => {
          dispatch(deleteEntity({ plantProject: [plantProjectId] }));
          dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
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

export function updatePlantProject(plantProject) {
  return dispatch => {
    return new Promise(function(resolve) {
      let projectId = plantProject.id;
      delete plantProject.id;
      putAuthenticatedRequest('plantProject_put', plantProject, {
        plantProject: projectId
      })
        .then(res => {
          debug(res.status);
          debug(res);
          let updatedProject = res.data;
          if (updatedProject && updatedProject instanceof Object) {
            dispatch(
              mergeEntities(normalize(updatedProject, plantProjectSchema))
            );
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
