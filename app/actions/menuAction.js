import { getRequest, getAuthenticatedRequest } from '../utils/api';

import { debug } from '../debug/index';

export function MenuAction(isAuthenticated = false) {
  debug('Getting Menu: isAuthenticated =', isAuthenticated);
  return isAuthenticated
    ? getAuthenticatedRequest('data_menu_get')
    : getRequest('public_menu_get');
}
