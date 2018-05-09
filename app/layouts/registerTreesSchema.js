import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import { fetchItem } from '../stores/localStorage';

export function RegisterTreeSchema() {
  console.log('Getting Register Tree Form');
  const request = axios.get(getApiRoute('plantContribution_form'), {
    headers: { Authorization: `Bearer ${fetchItem('jwt')}` }
  });

  return request;
}
