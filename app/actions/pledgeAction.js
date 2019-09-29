import {
  getRequest,
  postRequest,
  postAuthenticatedRequest
} from '../utils/api';
import {
  fetchPledges,
  saveTimeoutID,
  clearTimeoutID,
  postedPledge
} from '../reducers/pledgeReducer';
import { NotificationManager } from 'react-notifications';
import i18n from '../locales/i18n.js';

export function fetchPledgesAction(eventSlug) {
  return dispatch => {
    getRequest('pledgeEvent_get', {
      version: 'v1.3',
      eventSlug: eventSlug
    }).then(res => {
      dispatch(fetchPledges(res.data));
    });
    let timeoutID = setInterval(
      () =>
        getRequest('pledgeEvent_get', {
          version: 'v1.3',
          eventSlug: eventSlug
        }).then(res => {
          dispatch(fetchPledges(res.data));
        }),
      10000
    );
    dispatch(saveTimeoutID(timeoutID));
  };
}

export function postPledge(data, params, loggedIn) {
  return dispatch => {
    loggedIn
      ? postAuthenticatedRequest('eventPledgeAuthed_post', data, params)
          .then(res => {
            const { statusText } = res;
            dispatch(postedPledge(res.data));
            console.log('authenticated post');
            console.log(res.data);
            NotificationManager.success(
              statusText,
              i18n.t('label.success'),
              5000
            );
          })
          .catch(error => {
            NotificationManager.error(
              error.response.data.message,
              i18n.t('label.error'),
              5000
            );
          })
      : postRequest('eventPledge_post', data, params)
          .then(res => {
            const { statusText } = res;
            dispatch(postedPledge(res.data));
            console.log('normal post');
            console.log(res.data);
            NotificationManager.success(
              statusText,
              i18n.t('label.success'),
              5000
            );
          })
          .catch(error => {
            NotificationManager.error(
              error.response.data.message,
              i18n.t('label.error'),
              5000
            );
          });
  };
}

export function clearTimeoutAction(id) {
  return dispatch => {
    clearInterval(id);
    dispatch(clearTimeoutID());
  };
}
