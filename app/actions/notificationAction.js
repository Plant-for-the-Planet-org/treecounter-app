import { getAuthenticatedrequest } from '../utils/api';

import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';

export function NotificationAction() {
  debug('Getting Notifications');
  return getAuthenticatedrequest(getApiRoute('notifications_get'));
}
