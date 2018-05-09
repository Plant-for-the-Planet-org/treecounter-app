import { getAuthenticatedrequest } from '../utils/api';

export function PaymentSchema() {
  console.log('Getting Donation Contribution Form');
  const request = getAuthenticatedrequest('donationContribution_form');

  return request;
}
