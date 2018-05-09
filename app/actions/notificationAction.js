import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';
import { fetchItem } from '../stores/localStorage';

export function NotificationAction() {
  debug('Getting Notifications');
  return axios.get(getApiRoute('notifications_get'), {
    headers: { Authorization: `Bearer ${fetchItem('jwt')}` }
  });
}
