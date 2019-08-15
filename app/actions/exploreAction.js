import { getAuthenticatedRequest } from '../utils/api';

export function ExploreDataAction() {
  return getAuthenticatedRequest('public_exploreData_get');
}

export function LeaderBoardDataAction(params) {
  return getAuthenticatedRequest('public_exploreQuery_get', params);
}
