import { normalize } from 'normalizr';

import { getAuthenticatedRequest } from '../utils/api';
import { tpoSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';

// TODO: unsused. consider eliminating
export function loadTpos() {
  const request = getAuthenticatedRequest('data_tpos_get');
  return dispatch => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, [tpoSchema])));
    });
  };
}
