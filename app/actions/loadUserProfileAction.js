import { normalize } from 'normalizr';
import { debug } from '../debug';
import { getAuthenticatedRequest } from '../utils/api';
import { userProfileSchema } from '../schemas/index';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { setLastRoute } from '../reducers/updateLastRouteReducer';
import { updateRoute } from '../helpers/routerHelper';

export function loadUserProfile(props) {
  const request = getAuthenticatedRequest('load_user_profiledata_userProfile_get');

  return dispatch => {
    dispatch(setProgressModelState(true));
    request
      .then(res => {
        if (res.status === 303) {
          updateRoute('app_signup', props.navigation || dispatch);
        }
        else {
          dispatch(mergeEntities(normalize(res.data, userProfileSchema)));
          dispatch(setCurrentUserProfileId(res.data.id));
          dispatch(setProgressModelState(false));
          if (props) {
            dispatch(setLastRoute(props));
          }
        }

      })
      .catch(error => {
        debug(error);
        dispatch(setProgressModelState(false));
      });
  };
}
