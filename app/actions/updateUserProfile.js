import {
  putAuthenticatedRequest,
  deleteAuthenticatedRequest,
  postAuthenticatedRequest
} from '../utils/api';
import { debug } from '../debug';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import {
  userProfileSchema,
  plantProjectSchema,
  tpoSchema
} from '../schemas/index';
import { normalize } from 'normalizr';
import {
  deleteEntity,
  unlinkEntity,
  mergeEntities
} from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';

const profileTypeToReq = {
  profile: 'profile_put',
  about_me: 'profileAboutMe_put',
  password: 'profilePassword_put',
  image: 'profileImage_put',
  currency: 'profileCurrency_put',
  locale: 'profileLocale_put'
};

export function addPlantProject(plantProject) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve) {
      postAuthenticatedRequest('plantProject_post', plantProject)
        .then(res => {
          debug(res.status);
          debug(res);
          const { plantProject, userProfile, tpo } = res.data.merge;
          dispatch(
            mergeEntities(normalize(plantProject, [plantProjectSchema]))
          );
          dispatch(mergeEntities(normalize(tpo, [tpoSchema])));
          dispatch(mergeEntities(normalize(userProfile, [userProfileSchema])));
          NotificationManager.success(
            i18n.t('label.new_project_added_successfully'),
            i18n.t('label.congrats'),
            5000
          );
          resolve(plantProject);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, i18n.t('label.error'), 5000);
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
          dispatch(unlinkEntity(res.data.unlink));
          dispatch(deleteEntity(res.data.delete));
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
          let { plantProject } = res.data.merge;
          dispatch(
            mergeEntities(normalize(plantProject, [plantProjectSchema]))
          );
          let { unlink, delete: deleteContent } = res.data;
          if (unlink && deleteContent) {
            dispatch(unlinkEntity(unlink));
            dispatch(deleteEntity(deleteContent));
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
          const { plantProject } = res.data.merge;
          dispatch(
            mergeEntities(normalize(plantProject, [plantProjectSchema]))
          );
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

export function updateUserProfile(data, profileType, forcePromisify) {
  console.log('\x1b[45m \n\n');
  console.log(data, profileType, forcePromisify);
  console.log('\n\n \x1b[0m');
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      putAuthenticatedRequest(profileTypeToReq[profileType], data)
        .then(res => {
          debug(res.status);
          debug(res);
          debug(userProfileSchema);

          if (res.data && res.data instanceof Object) {
            if (res.data.merge) {
              dispatch(
                mergeEntities(
                  normalize(res.data.merge.userProfile, [userProfileSchema])
                )
              );
            } else {
              dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
            }
          }
          if (res.data.merge) resolve(res.data);
          forcePromisify && resolve(res.data);
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

export function updateProfileDedication(data) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      putAuthenticatedRequest('profileDedication_put', data)
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

export function updateUserEmail(newEmail) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      putAuthenticatedRequest('profileEmail_put', { ...newEmail })
        .then(res => {
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
