import { normalize } from 'normalizr';

import { getRequest } from '../utils/api';
import { tpoSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';

export function loadTpos() {
  const request = getRequest('data_tpos_get');
  return dispatch => {
    request
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, [tpoSchema])));
      })
      .catch(error => console.log(error));
  };
}
