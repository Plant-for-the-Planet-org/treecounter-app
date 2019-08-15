import { getAuthenticatedRequest } from '../utils/api';

export function PaymentSchema() {
  const request = getAuthenticatedRequest('donationContribution_form');

  return request;
}
