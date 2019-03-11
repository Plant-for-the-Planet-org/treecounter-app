import { postAuthenticatedRequest } from '../utils/api';
import { NotificationManager } from 'react-notifications';

export function postChangeOrder(data, params) {
  return postAuthenticatedRequest('plantProject_position', data, params)
    .then(res => {
      console.log(res);
      const { statusText } = res;

      NotificationManager.success(statusText, 'Success', 5000);
    })
    .catch(error => {
      console.log(error);
      //NotificationManager.error(error.response.data.message, 'Error', 5000);
    });
}
