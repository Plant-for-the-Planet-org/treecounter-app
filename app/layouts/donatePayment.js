import { getAuthenticatedRequest } from '../utils/api';

export function PaymentSchema() {
  console.log('Getting Donation Contribution Form');
  const request = getAuthenticatedRequest('donationContribution_form');

  return request;
}
