import { getRequest } from '../utils/api';

export function pledgeEventsAction() {
  return getRequest('public_pledgeEvents_get');
}
