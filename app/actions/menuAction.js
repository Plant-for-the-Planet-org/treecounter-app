import { normalize } from 'normalizr';
import { debug } from '../debug';
import i18n from '../locales/i18n.js';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { mergeEntities } from '../reducers/entitiesReducer';
import { plantProjectSchema } from '../schemas';
import {
  getAuthenticatedRequest,
  getRequest,
  putAuthenticatedRequest
} from '../utils/api';

export function MenuAction(isAuthenticated = false) {
  return isAuthenticated
    ? getAuthenticatedRequest('menudata_menu_get')
    : getRequest('public_menu_get');
}

export function updateTpoProject(plantProject) {
  return dispatch => {
    return new Promise(function(resolve) {
      let projectId = plantProject.id;
      delete plantProject.id;
      putAuthenticatedRequest('plantProject_put', plantProject, {
        plantProject: projectId
      })
        .then(res => {
          //debug(res.status);
          //debug(res);
          let updatedProject = res.data;
          if (updatedProject && updatedProject instanceof Object) {
            dispatch(
              mergeEntities(normalize(updatedProject, plantProjectSchema))
            );
          }
          NotificationManager.success(
            i18n.t('label.plant_project_update_success'),
            i18n.t('label.congrats'),
            5000
          );
          resolve(res.data);
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, i18n.t('label.error'), 5000);
        });
    });
  };
}
