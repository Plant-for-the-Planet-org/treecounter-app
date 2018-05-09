import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import { fetchItem } from '../stores/localStorage';

export function PaymentSchema() {
  console.log('Getting Donation Contribution Form');
  const request = axios.get(getApiRoute('donationContribution_form'), {
    headers: { Authorization: `Bearer ${fetchItem('jwt')}` }
  });

  return request;
}
