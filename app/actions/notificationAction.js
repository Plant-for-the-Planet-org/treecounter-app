import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';

export function NotificationAction() {
  debug('Getting Notifications');
  return axios.get(getApiRoute('notifications_get'), {
    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` }
  });
}
