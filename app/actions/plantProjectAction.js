import { normalize } from 'normalizr';

import { getRequest } from '../utils/api';
import { plantProjectSchema } from '../schemas/index';
// import { mergeEntities } from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
export function fetchPlantProjectDetail(uid) {
  const request = getRequest('plantProject_get', { uid, version: 'v1.3' });
  // TODO: make this real dispatch whihc updates data to redux
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise((resolve, reject) => {
      request
        .then(res => {
          // need to update globale schema to handle the change in store
          // DO the merge entity with new data
          // do that for tpo// find tpoData and set the schema
          // actually we do need tpo list anywhere? if not we can ignore the tpo entity on store
          let data = { ...res.data };
          //dispatch(mergeEntities(normalize(data, plantProjectSchema)));
          //
          console.log(
            'normalized plantproject',
            normalize(data, plantProjectSchema),
            res
          );
          resolve(data);
          dispatch(setProgressModelState(false));
        })
        .catch(error => {
          console.log(error);
          reject(null);
          dispatch(setProgressModelState(false));
        });
    });
  };
}
