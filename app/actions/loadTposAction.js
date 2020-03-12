import { normalize } from 'normalizr';
import { debug } from '../debug';
import { getRequest } from '../utils/api';
import { tpoSchema, plantProjectSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { setSelectedPlantProjectId } from '../reducers/selectedPlantProjectIdReducer';

export function loadProjects(category = 'all', options = {}) {
  const request = getRequest('plantProjects_get', {
    category: category,
    ...options
  });
  return dispatch => {
    !options.page && dispatch(setProgressModelState(true));
    return new Promise(function (resolve, reject) {
      request
        .then(res => {
          // debug(res);
          if (options.loadAll) {
            let plantProjectPager = res.data.merge.plantProjectPager[0];
            if (plantProjectPager.currentPage < plantProjectPager.nbPages) {
              dispatch(
                loadProjects(category, {
                  ...options,
                  page: ++plantProjectPager.currentPage
                })
              );
            }
          }
          dispatch(
            mergeEntities(
              normalize(res.data.merge.plantProjectPager[0].entities, [
                plantProjectSchema
              ])
            )
          );
          // category == 'featured' &&
          //   res.data.merge.plantProjectPager[0].entities.map(plantProject => {
          //     dispatch(loadProject(plantProject));
          //   });
          resolve(res.data.merge.plantProjectPager[0].entities);
          !options.page && dispatch(setProgressModelState(false));
        })
        .catch(error => {
          debug(error);
          reject(error);
          !options.page && dispatch(setProgressModelState(false));
        });
    });
  };
}

export function loadProject(plantProject, options = {}) {
  const request = getRequest('plantProject_get', { uid: plantProject.id });
  return dispatch => {
    options.loading && dispatch(setProgressModelState(true));
    return new Promise(function (resolve, reject) {
      request
        .then(res => {
          debug('========================', res.data);
          dispatch(setSelectedPlantProjectId(parseInt(plantProject.id)));
          dispatch(mergeEntities(normalize(res.data, plantProjectSchema)));
          dispatch(mergeEntities(normalize(res.data.tpoData, tpoSchema)));
          options.loading && dispatch(setProgressModelState(false));
          resolve(res.data);
        })
        .catch(error => {
          debug(error);
          options.loading && dispatch(setProgressModelState(false));
          reject(error);
        });
    });
  };
}


export function loadProjectWeb(param, options = {}) {
  const request = getRequest('plantProject_get', { uid: param.id });
  return dispatch => {
    options.loading && dispatch(setProgressModelState(true));
    return new Promise(function (resolve, reject) {
      request
        .then(res => {
          debug('========================', res.data);
          dispatch(setSelectedPlantProjectId(parseInt(res.data.id)));
          dispatch(mergeEntities(normalize(res.data, plantProjectSchema)));
          dispatch(mergeEntities(normalize(res.data.tpoData, tpoSchema)));
          options.loading && dispatch(setProgressModelState(false));
          resolve(res.data);
        })
        .catch(error => {
          debug(error);
          options.loading && dispatch(setProgressModelState(false));
          reject(error);
        });
    });
  };
}
