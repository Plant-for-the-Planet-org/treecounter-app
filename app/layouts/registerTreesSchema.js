import { getAuthenticatedrequest } from '../utils/api';

export function RegisterTreeSchema() {
  console.log('Getting Register Tree Form');
  const request = getAuthenticatedrequest('plantContribution_form');

  return request;
}
