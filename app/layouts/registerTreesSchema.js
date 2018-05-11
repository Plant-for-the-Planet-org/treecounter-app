import { getAuthenticatedRequest } from '../utils/api';

export function RegisterTreeSchema() {
  console.log('Getting Register Tree Form');
  const request = getAuthenticatedRequest('plantContribution_form');

  return request;
}
