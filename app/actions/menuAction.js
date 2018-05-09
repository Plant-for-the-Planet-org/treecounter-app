import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';
import { fetchItem } from '../stores/localStorage';

export function MenuAction(isAuthenticated = false) {
  debug('Getting Menu: isAuthenticated =', isAuthenticated);
  return axios({
    ...(isAuthenticated
      ? {
          method: 'GET',
          url: getApiRoute('data_menu_get'),
          headers: { Authorization: `Bearer ${fetchItem('jwt')}` }
        }
      : {
          method: 'GET',
          url: getApiRoute('public_menu_get')
        })
  });
}
