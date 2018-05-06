import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';

export function RegisterTreeSchema() {
  console.log('Getting Register Tree Form');
  const request = axios.get(getApiRoute('plantContribution_form'), {
    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` }
  });

  return request;
}
