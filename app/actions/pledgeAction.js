import { getRequest, postRequest } from '../utils/api';
import { fetchPledges, saveTimeoutID } from '../reducers/pledgeReducer';

export function fetchPledgesAction(eventSlug) {
  return dispatch => {
    getRequest('pledgeEvent_get', {
      eventSlug: eventSlug
    }).then(res => {
      dispatch(fetchPledges(res.data));
    });
    let timeoutID = setInterval(
      () =>
        getRequest('pledgeEvent_get', {
          eventSlug: eventSlug
        }).then(res => {
          dispatch(fetchPledges(res.data));
        }),
      10000
    );
    dispatch(saveTimeoutID(timeoutID));
  };
}

export function postPledge(data, params) {
  return dispatch => {
    postRequest('eventPledge_post', data, params).then(res => {
      console.log(dispatch, res);
    });
  };
}
