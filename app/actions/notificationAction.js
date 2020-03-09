import { debug } from '../debug';
import {
  getAuthenticatedRequest,
  postAuthenticatedRequest
} from '../utils/api';
import {
  userFeedsSynced,
  userFeedsSyncedMore,
  userFeedsSyncedMarkRead
} from '../reducers/userFeedReducer';

export function NotificationAction() {
  const request = getAuthenticatedRequest('userfeeds_get');
  return dispatch => {
    request
      .then(res => {
        dispatch(userFeedsSynced(res.data));
      })
      .catch(error => {
        debug(error);
      });
  };
}

export function moreNotificationAction(id) {
  const request = getAuthenticatedRequest('userfeedsMore_get', { lastId: id });
  return dispatch => {
    request
      .then(res => {
        dispatch(userFeedsSyncedMore(res.data));
      })
      .catch(error => {
        debug(error);
      });
  };
}

export function markSeenNotificationAction(id) {
  const request = postAuthenticatedRequest('userFeedsMarkRead_post', {
    lastId: id
  });
  return dispatch => {
    request
      .then(res => {
        dispatch(userFeedsSyncedMarkRead(res.data));
      })
      .catch(error => {
        debug(error);
      });
  };
}
