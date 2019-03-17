import { normalize } from 'normalizr';
import {
  postAuthenticatedRequest,
  putAuthenticatedRequest
} from '../utils/api';

import { setProgressModelState } from '../reducers/modelDialogReducer';
import { mergeEntities } from '../reducers/entitiesReducer';
import { challengeSchema } from '../schemas';

export function challenge(challengeDetails) {
  let route = 'challenge_post';

  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = postAuthenticatedRequest(route, challengeDetails);
    request
      .then(response => {
        dispatch(setProgressModelState(false));
        dispatch(mergeEntities(normalize(response.data, challengeSchema)));
      })
      .catch(response => {
        debug('error: ', response);
        dispatch(setProgressModelState(false));
      });
  };
}

export function challengeStatus(status, token) {
  let route = 'challenge_put';

  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = putAuthenticatedRequest(route, status, {
      token: token
    });
    request
      .then(response => {
        dispatch(setProgressModelState(false));
        dispatch(mergeEntities(normalize(response.data, challengeSchema)));
      })
      .catch(response => {
        debug('error: ', response);
        dispatch(setProgressModelState(false));
      });
  };
}
