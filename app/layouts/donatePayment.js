import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';

export function PaymentSchema() {
  console.log('Getting Donation Contribution Form');
  const request = axios.get(getApiRoute('donationContribution_form'), {
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
  });

  return request;
}
