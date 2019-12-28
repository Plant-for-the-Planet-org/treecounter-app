import { normalize } from 'normalizr';

import { getRequest } from '../utils/api';
import { tpoSchema, plantProjectSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';

export function loadTpos() {
  // loadProjects();
  const request = getRequest('data_tpos_get');

  return dispatch => {
    request
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, [tpoSchema])));
      })
      .catch(error => console.log(error));
  };
}
export function loadProjects(category = 'all') {
  const request = getRequest('plantProjects_get', { category: category });
  return dispatch => {
    request
      .then(res => {
        console.dir(res);
        let plantProjectPager = res.data.merge.plantProjectPager[0];
        if (plantProjectPager.currentPage < plantProjectPager.nbPages) {
          // dispatch(loadProjects(category));
        }
        dispatch(
          mergeEntities(
            normalize(res.data.merge.plantProjectPager[0].entities, [
              plantProjectSchema
            ])
          )
        );
        res.data.merge.plantProjectPager[0].entities.map(plantProject => {
          dispatch(loadProject(plantProject));
        });
      })
      .catch(error => console.log(error));
  };
}
export function loadProject(plantProject) {
  const request = getRequest('plantProject_get', { uid: plantProject.id });
  return dispatch => {
    request
      .then(res => {
        console.log('========================', res.data);
        dispatch(mergeEntities(normalize(res.data, plantProjectSchema)));
        dispatch(mergeEntities(normalize(res.data.tpoData, tpoSchema)));
      })
      .catch(error => console.log(error));
  };
}
