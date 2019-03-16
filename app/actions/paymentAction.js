import { debug } from '../debug/index';
import { getRequest, postRequest } from '../utils/api';

export function getPaymentInfo(paymentInfoId) {
  return getRequest('paymentInfo_get', { token: paymentInfoId });
}

export function payPost(paymentResponse, paymentInfoId) {
  let request = { paymentResponse: paymentResponse };
  return postRequest('pay_post', request, {
    token: paymentInfoId
  });
}
