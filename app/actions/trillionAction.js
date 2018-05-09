import { getAuthenticatedRequest } from '../utils/api';

import { getApiRoute } from './apiRouting';

export function trillionCampaign() {
  return getAuthenticatedRequest(getApiRoute('treecounter_get'));
}
