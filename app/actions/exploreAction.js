import { getAuthenticatedRequest } from '../utils/api';
import { debug } from '../debug/index';

export function ExploreDataAction() {
  debug('Getting Explore Data');
  return getAuthenticatedRequest('public_explore_get');
}

export function LeaderBoardDataAction(params) {
  debug('Getting Explore Data');
  return getAuthenticatedRequest('public_explore_query', params);
}
