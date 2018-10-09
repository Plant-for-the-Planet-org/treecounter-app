import {
  getRequest,
  postAuthenticatedRequest,
  postRequest
} from '../utils/api';
import { NotificationManager } from 'react-notifications';
import { redemptCode, validateCode } from '../reducers/redemptionReducer';

export function validateCodeAction(data, params) {
  return dispatch => {
    postAuthenticatedRequest('validateCode_post', data, params).then(res => {
      dispatch(validateCode(res.data));
    });
  };
}

export function setRedemptionCodeAction(data, params) {
  return dispatch => {
    postAuthenticatedRequest('convertCode_post', data, params).then(res => {
      dispatch(redemptCode(res.data));
    });
  };
}
