import {
  getRequest,
  postAuthenticatedRequest,
  postRequest
} from '../utils/api';
import { NotificationManager } from 'react-notifications';

export function validateCodeAction(data, params) {
  return postAuthenticatedRequest('validateCode_post', data, params);
}

export function setRedemptionCodeAction(data, params) {
  return postAuthenticatedRequest('convertCode_post', data, params);
}
