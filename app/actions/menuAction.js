import { getRequest, getAuthenticatedRequest } from '../utils/api';
import { debug } from '../debug';

export function MenuAction(isAuthenticated = false) {
  return isAuthenticated
    ? getAuthenticatedRequest('data_menu_get')
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
