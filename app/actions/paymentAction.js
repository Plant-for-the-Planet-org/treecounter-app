import { getRequest } from '../utils/api';

export function getPaymentInfo(paymentInfoId) {
  return getRequest('paymentInfo_get', {
    token: paymentInfoId,
    version: 'v1.3'
  });
}
