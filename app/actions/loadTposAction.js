import { normalize } from 'normalizr';

import { getRequest } from '../utils/api';
import { tpoSchema, plantProjectSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function loadProjects(category = 'all', options = {}) {
  const request = getRequest('plantProjects_get', {
    category: category,
    ...options
  });
  return dispatch => {
    !options.page && dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      request
        .then(res => {
          // console.dir(res);
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
          console.log(error);
          reject(error);
          !options.page && dispatch(setProgressModelState(false));
        });
    });
  };
}

export function loadProject(plantProject) {
  const request = getRequest('plantProject_get', { uid: plantProject.id });
  return dispatch => {
    // dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      request
        .then(res => {
          console.log('========================', res.data);
          dispatch(mergeEntities(normalize(res.data, plantProjectSchema)));
          dispatch(mergeEntities(normalize(res.data.tpoData, tpoSchema)));
          // dispatch(setProgressModelState(false));
          resolve(res.data);
        })
        .catch(error => {
          console.log(error);
          // dispatch(setProgressModelState(false));
          reject(error);
        });
    });
  };
}
