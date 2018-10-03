import { getRequest, postRequest } from '../utils/api';
import { NotificationManager } from 'react-notifications';
import { validateCode } from '../reducers/redemptionReducer';

export function validateCodeAction(code) {
  return dispatch => {
    getRequest('pledgeEvent_get', {
      token: code
    }).then(res => {
      dispatch(validateCode(res.data));
    });
  };
}

export function setRedemptionCodeAction(data, params) {
  return dispatch => {
    postRequest('eventPledge_post', data, params)
      .then(res => {
        console.log(dispatch, res);
        const { statusText } = res;

        NotificationManager.success(statusText, 'Success', 5000);
      })
      .catch(error => {
        NotificationManager.error(error.response.data.message, 'Error', 5000);
      });
  };
}
