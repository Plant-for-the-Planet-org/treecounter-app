import { postAuthenticatedRequest } from '../utils/api';
import { treecounterSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { normalize } from 'normalizr';

export function validateCodeAction(data, params) {
  return postAuthenticatedRequest('validateCode_post', data, params);
}

export function setRedemptionCodeAction(data, params) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      postAuthenticatedRequest('convertCode_post', data, params)
        .then((res) => {
          if (res.data.schemata && res.data.schemata.treecounter)
            dispatch(mergeEntities(normalize(res.data.schemata.treecounter, treecounterSchema)));
          resolve(res);
        }, (err) => {
          reject(err)
        });
    })
  }
}
