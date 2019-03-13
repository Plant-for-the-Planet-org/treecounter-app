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
import { setProgressModelState } from '../reducers/modelDialogReducer';
const profileTypeToReq = {
  profile: 'profile_put',
  about_me: 'profileAboutMe_put',
  password: 'profilePassword_put',
  image: 'profileImage_put'
};

export function addPlantProject(plantProject) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve) {
      postAuthenticatedRequest('plantProject_post', plantProject)
        .then(res => {
          debug(res.status);
          debug(res);
          const plantProject = res.data;
          if (plantProject && plantProject instanceof Object) {
            dispatch(
              mergeEntities(normalize(plantProject, plantProjectSchema))
            );
          }
          NotificationManager.success(
            `New Project Added Successfully`,
            `Congrats`,
            5000
          );
          resolve(plantProject);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, 'Profile update Error', 5000);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function deletePlantProject(plantProjectId) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      deleteAuthenticatedRequest('plantProject_delete', {
        plantProject: plantProjectId
      })
        .then(res => {
          const userProfile = res.data;
          dispatch(deleteEntity({ plantProject: [plantProjectId] }));
          dispatch(mergeEntities(normalize(userProfile, userProfileSchema)));
          resolve(userProfile);
        })
        .catch(err => {
          debug(err);
          reject(err);
        });
    });
  };
}

export function updatePlantProject(plantProject) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      let projectId = plantProject.id;
      delete plantProject.id;
      putAuthenticatedRequest('plantProject_put', plantProject, {
        plantProject: projectId
      })
        .then(res => {
          debug(res.status);
          debug(res);
          const { plantProject, plantProjectImage: deleteIds } = res.data;
          if (plantProject && plantProject instanceof Object) {
            dispatch(
              mergeEntities(normalize(plantProject, plantProjectSchema))
            );
            dispatch(deleteEntity({ plantProjectImage: deleteIds }));
          }
          resolve(res.data);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          reject(err);
          dispatch(setProgressModelState(false));
        });
    });
  };
}
export function orderPlantProject(data, params) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      postAuthenticatedRequest('plantProject_position', data, params)
        .then(res => {
          const { statusText } = res;
          dispatch(mergeEntities(normalize(res.data, plantProjectSchema)));
          resolve(res.data);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          reject(err);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function updateUserProfile(data, profileType) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      putAuthenticatedRequest(profileTypeToReq[profileType], data)
        .then(res => {
          debug(res.status);
          debug(res);
          if (res.data && res.data instanceof Object) {
            dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          }
          resolve(res.data);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          reject(err);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function deleteUserProfile(userProfile) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      deleteAuthenticatedRequest('profile_delete', { userProfile })
        .then(res => {
          debug(res.status);
          debug(res);
          if (res.data && res.data instanceof Object) {
            dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          }
          resolve(res.data);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          reject(err);
          dispatch(setProgressModelState(false));
        });
    });
  };
}
