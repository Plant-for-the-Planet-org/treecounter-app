import { getAuthenticatedRequest } from '../utils/api';

export function trillionCampaign() {
  return getAuthenticatedRequest('treecounter_get');
}
