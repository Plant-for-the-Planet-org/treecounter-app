import { getAuthenticatedRequest } from '../utils/api';

export function RegisterTreeSchema() {
  const request = getAuthenticatedRequest('plantContribution_form');

  return request;
}
