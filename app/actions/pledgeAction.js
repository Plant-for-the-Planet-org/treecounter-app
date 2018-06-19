import { getRequest } from '../utils/api';
import { fetchPledges } from '../reducers/pledgeReducer';

export function fetchPledgesAction() {
  const request = getRequest('pledgeEvent_get', {
    eventSlug: 'esri-user-conference'
  });
  return dispatch => {
    request.then(res => {
      dispatch(fetchPledges(res.data));
    });
  };
}
