import { getAuthenticatedRequest } from '../utils/api';

import { debug } from '../debug/index';

export function NotificationAction() {
  debug('Getting Notifications');
  return getAuthenticatedRequest('notifications_get');
}
