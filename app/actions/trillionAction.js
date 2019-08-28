import memoize from 'lodash/memoize';

import { getAuthenticatedRequest } from '../utils/api';

export const trillionCampaign = memoize(function() {
  return getAuthenticatedRequest('treecounter_get');
});
