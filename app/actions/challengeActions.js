import { normalize } from 'normalizr';
import { debug } from '../debug';
import {
  postAuthenticatedRequest,
  putAuthenticatedRequest,
  putRequest
} from '../utils/api';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema, challengeSchema } from '../schemas';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import i18n from '../locales/i18n.js';

export function challenge(challengeDetails) {
  let route = 'challenge_post';

  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      let request = postAuthenticatedRequest(route, challengeDetails, {
        version: 'v1.3'
      });
      request
        .then(response => {
          dispatch(mergeEntities(normalize(response.data, treecounterSchema)));
          dispatch(setProgressModelState(false));
          resolve(response.data);
          NotificationManager.success(
            i18n.t('label.challenge_create_successfully'),
            i18n.t('label.success'),
            5000
          );
        })
        .catch(error => {
          debug('error: ', error);
          reject(error);
          dispatch(setProgressModelState(false));
          NotificationManager.error(
            error.response.data.message,
            i18n.t('label.error'),
            5000
          );
        });
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
      { status: 'declined' },
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
