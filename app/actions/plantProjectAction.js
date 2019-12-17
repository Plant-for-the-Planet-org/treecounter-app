import { normalize } from 'normalizr';

import { getRequest } from '../utils/api';
import { plantProjectSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';

export function fetchPlantProjectDetail(uid) {
  const request = getRequest('plantProject_get', { uid, version: 'v1.3' });
  // TODO: make this real dispatch whihc updates data to redux
  // return (dispatch) => {
  return new Promise((resolve, reject) => {
    request
      .then(res => {
        // DO the merge entity with new data
        let data = { ...res.data };
        //dispatch(mergeEntities(normalize(data, plantProjectSchema)));
        console.log(
          'normalized plantproject',
          normalize(data, plantProjectSchema),
          res
        );
        resolve(data);
      })
      .catch(error => {
        console.log(error);
        reject(null);
      });
  });
  // }
}
