import { getAuthenticatedRequest } from '../utils/api';
import { userFeedsSynced } from '../reducers/userFeedReducer';

export function NotificationAction() {
  const request = getAuthenticatedRequest('userfeeds_get');
  return dispatch => {
    request.then(res => {
      dispatch(userFeedsSynced(res.data));
    });
  };
}
