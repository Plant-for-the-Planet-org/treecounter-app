import { getAuthenticatedRequest } from '../utils/api';
import {
  userFeedsSynced,
  userFeedsSyncedMore
} from '../reducers/userFeedReducer';

export function NotificationAction() {
  const request = getAuthenticatedRequest('userfeeds_get');
  return dispatch => {
    request.then(res => {
      dispatch(userFeedsSynced(res.data));
    });
  };
}

export function moreNotificationAction(id) {
  const request = getAuthenticatedRequest('userfeedsMore_get', { lastId: id });
  return dispatch => {
    request.then(res => {
      dispatch(userFeedsSyncedMore(res.data));
    });
  };
}
