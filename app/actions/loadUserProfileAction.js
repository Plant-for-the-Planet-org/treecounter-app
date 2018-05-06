import axios from 'axios';
import { normalize } from 'normalizr';

import { userProfileSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { getApiRoute } from '../actions/apiRouting';

// TODO: unsused. consider eliminating
export function loadUserProfile(token) {
  const request = axios.get(getApiRoute('data_userProfile_get'), {
    headers: { Authorization: `Bearer ${token}` }
  });
  return dispatch => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
      dispatch(setCurrentUserProfileId(res.data.id));
    });
  };
}
