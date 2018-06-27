import { getRequest, getAuthenticatedRequest } from '../utils/api';

export function MenuAction(isAuthenticated = false) {
  return isAuthenticated
    ? getAuthenticatedRequest('data_menu_get')
    : getRequest('public_menu_get');
}
