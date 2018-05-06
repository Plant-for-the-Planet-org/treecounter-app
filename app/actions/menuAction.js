import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import * as ROUTES from '../constants/routes';
import { debug } from '../debug/index';

export function MenuAction(isAuthenticated = false) {
  debug('Getting Menu: isAuthenticated =', isAuthenticated);
  return axios({
    ...(isAuthenticated
      ? {
          method: ROUTES.getAuthenticatedMenu.method,
          url: getApiRoute(ROUTES.getAuthenticatedMenu.name),
          headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` }
        }
      : {
          method: ROUTES.getUnAuthenticatedMenu.method,
          url: getApiRoute(ROUTES.getUnAuthenticatedMenu.name)
        })
  });
}
