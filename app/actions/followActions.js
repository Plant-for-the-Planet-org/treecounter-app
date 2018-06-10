import { normalize } from 'normalizr';

import { postAuthenticatedRequest } from '../utils/api';
import { mergeEntities } from '../reducers/entitiesReducer';

import { treecounterSchema } from '../schemas';

export function followUser(id) {
  const request = postAuthenticatedRequest('followSubscribe_post', {
    _format: 'json',
    follow: { followee: id }
  });
  return dispatch => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
    });
  };
}

export function unfollowUser(id) {
  const request = postAuthenticatedRequest('followUnSubscribe_post', {
    _format: 'json',
    follow: { followee: id }
  });
  return dispatch => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
    });
  };
}
