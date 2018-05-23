import { normalize } from 'normalizr';

import { getAuthenticatedRequest } from '../utils/api';
import { userProfileSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';

// TODO: unsused. consider eliminating
export function loadUserProfile() {
  const request = getAuthenticatedRequest('data_userProfile_get');
  return dispatch => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
      dispatch(setCurrentUserProfileId(res.data.id));
    });
  };
}
