import { getRequest } from '../utils/api';
import {
  setPledgeEvents,
  fetchPledgeEvents
} from '../reducers/pledgeEventReducer';

export function fetchpledgeEventsAction() {
  return dispatch => {
    getRequest('public_pledgeEvents_get').then(val => {
      dispatch(
        setPledgeEvents(
          val.data.sort(function(a, b) {
            return a.position < b.position;
          })
        )
      );
    });
  };
}
