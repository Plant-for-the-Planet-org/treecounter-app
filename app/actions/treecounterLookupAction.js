import { getRequest } from '../utils/api';
import { normalize, denormalize } from 'normalizr';

import { treecounterSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { updateRoute } from '../helpers/routerHelper';

export function treecounterLookupAction(treecounterId) {
  return (dispatch, getState) => {
    // the treecounter might already exist in normalized form in the redux-store
    // if so we de-normalize and just return it
    if (!treecounterId) {
      updateRoute('app_homepage', dispatch);
      return Promise.reject('user not available');
    }
    return new Promise(function(resolve) {
      const entities = getState().entities;
      if (entities.treecounter.treecounterId) {
        resolve(
          denormalize(
            entities.treecounter[treecounterId],
            treecounterSchema,
            entities
          )
        );
      }

      // the treecounter has not been fetched yet
      // so we store it in normalized form in the redux-store but return the original data
      getRequest('treecounter_get', { uid: treecounterId })
        .then(result => {
          const treecounter = result.data;
          dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
          resolve(treecounter);
        })
        .catch(error => {
          updateRoute('app_homepage', dispatch);
          Promise.reject(error);
        });
    });
  };
}
