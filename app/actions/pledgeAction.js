import { getRequest, postRequest } from '../utils/api';
import {
  fetchPledges,
  saveTimeoutID,
  clearTimeoutID
} from '../reducers/pledgeReducer';
import { NotificationManager } from 'react-notifications';

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
    postRequest('eventPledge_post', data, params)
      .then(res => {
        // console.log(dispatch, res);
        const { statusText } = res;

        NotificationManager.success(statusText, 'Success', 5000);
      })
      .catch(error => {
        NotificationManager.error(error.response.data.message, 'Error', 5000);
      });
  };
}

export function clearTimeoutAction(id) {
  return dispatch => {
    clearInterval(id);
    dispatch(clearTimeoutID());
  };
}
