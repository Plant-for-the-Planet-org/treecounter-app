import { getAuthenticatedrequest } from '../utils/api';

import { getApiRoute } from '../actions/apiRouting';

export function PaymentSchema() {
  console.log('Getting Donation Contribution Form');
  const request = getAuthenticatedrequest(
    getApiRoute('donationContribution_form')
  );

  return request;
}
