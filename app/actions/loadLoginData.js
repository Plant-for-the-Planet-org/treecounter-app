import { normalize } from 'normalizr';

import { getAuthenticatedRequest } from '../utils/api';
import { tpoSchema } from '../schemas/index';
import { userProfileSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { debug } from '../debug/index';

export function loadLoginData() {
  debug('dispatching: loadLoginData');
  const request = getAuthenticatedRequest('data_loginLoad_get');
  return dispatch => {
    request.then(res => {
      debug(res);
      dispatch(
        mergeEntities(normalize(res.data.userProfile, userProfileSchema))
      );
      dispatch(setCurrentUserProfileId(res.data.userProfile.id));
      dispatch(mergeEntities(normalize(res.data.tpos, [tpoSchema])));
    });
  };
}
