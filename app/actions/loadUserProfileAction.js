import { normalize } from 'normalizr';
import { debug } from '../debug';
import { getAuthenticatedRequest } from '../utils/api';
import { userProfileSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { setLastRoute } from '../reducers/updateLastRouteReducer';

export function loadUserProfile(returnData) {
  const request = getAuthenticatedRequest('data_userProfile_get');

  return dispatch => {
    dispatch(setProgressModelState(true));
    request
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
        dispatch(setCurrentUserProfileId(res.data.id));
        dispatch(setProgressModelState(false));
        if (returnData) {
          dispatch(setLastRoute(returnData));
        }
      })
      .catch(error => {
        debug(error);
        dispatch(setProgressModelState(false));
      });
  };
}
