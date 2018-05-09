import { normalize } from 'normalizr';

import { getAuthenticatedRequest } from '../utils/api';
import { tpoSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { getApiRoute } from '../actions/apiRouting';

// TODO: unsused. consider eliminating
export function loadTpos() {
  const request = getAuthenticatedRequest(getApiRoute('data_tpos_get'));
  return dispatch => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, [tpoSchema])));
    });
  };
}
