import { getRequest } from '../utils/api';
import { setPledgeEvents } from '../reducers/pledgeReducer';

export function pledgeEventsAction() {
  return dispatch => {
    getRequest('public_pledgeEvents_get').then(val =>
      dispatch(setPledgeEvents(val))
    );
  };
}
