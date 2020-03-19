import { normalize } from 'normalizr';
import { debug } from '../debug';
import { getAuthenticatedRequest } from '../utils/api';
import { userProfileSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';

export function loadLoginData() {
  const request = getAuthenticatedRequest('data_loginLoad_get');
  return dispatch => {
    request
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
        dispatch(setCurrentUserProfileId(res.data.id));
      })
      .catch(error => debug(error));
  };
}
