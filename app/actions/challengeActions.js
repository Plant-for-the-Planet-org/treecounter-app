import { normalize } from 'normalizr';
import {
  postAuthenticatedRequest,
  putAuthenticatedRequest,
  putRequest
} from '../utils/api';

import { setProgressModelState } from '../reducers/modelDialogReducer';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas';

export function challenge(challengeDetails) {
  let route = 'challenge_post';

  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = postAuthenticatedRequest(route, challengeDetails);
    request
      .then(response => {
        dispatch(setProgressModelState(false));
        dispatch(mergeEntities(normalize(response.data, treecounterSchema)));
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

export function denyChallenge(token) {
  let route = 'challengeDecline_put';

  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = putRequest(
      route,
      { status: 'decline' },
      {
        token: token
      }
    );
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

export function acceptChallenge(token) {
  let route = 'challenge_put';

  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = putAuthenticatedRequest(
      route,
      { status: 'active' },
      {
        token: token
      }
    );
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
