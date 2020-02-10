import { normalize } from 'normalizr';
import { debug } from '../debug';
import { postAuthenticatedRequest } from '../utils/api';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function followUser(id) {
  const request = postAuthenticatedRequest('followSubscribe_post', {
    _format: 'json',
    follow: { followee: id }
  });

  return dispatch => {
    dispatch(setProgressModelState(true));
    request
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}

export function unfollowUser(id) {
  const request = postAuthenticatedRequest('followUnSubscribe_post', {
    _format: 'json',
    follow: { followee: id }
  });

  return dispatch => {
    dispatch(setProgressModelState(true));
    request
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}
