import { normalize } from 'normalizr';

import { getRequest } from '../utils/api';
import { plantProjectSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';

export function fetchPlantProjectDetail(uid) {
  const request = getRequest('plantProject_get', { uid, version: 'v1.3' });
  // TODO: make this real dispatch whihc updates data to redux
  // explain: we have the projects data in redux at this point(in project detials ui), why should we call it and fetch same data again?
  // return (dispatch) => {
  return new Promise((resolve, reject) => {
    return request
      .then(res => {
        // DO the merge entity with new data
        //dispatch(mergeEntities(normalize(res.data, plantProjectSchema)));
        console.log(
          'normalized plantproject',
          normalize(res.data, plantProjectSchema),
          res
        );
        resolve(res.data);
      })
      .catch(error => {
        console.log(error);
        reject(null);
      });
    // };
  });
}
