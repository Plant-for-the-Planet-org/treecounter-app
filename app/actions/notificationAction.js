import { getAuthenticatedRequest } from '../utils/api';

export function NotificationAction() {
  return getAuthenticatedRequest('userfeeds_get');
}
