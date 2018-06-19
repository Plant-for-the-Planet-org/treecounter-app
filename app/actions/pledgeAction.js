import { getRequest } from '../utils/api';
import { fetchPledges, saveTimeoutID } from '../reducers/pledgeReducer';

export function fetchPledgesAction() {
  return dispatch => {
    let timeoutID = setInterval(
      () =>
        getRequest('pledgeEvent_get', {
          eventSlug: 'esri-user-conference'
        }).then(res => {
          dispatch(fetchPledges(res.data));
        }),
      10000
    );
    dispatch(saveTimeoutID(timeoutID));
  };
}
