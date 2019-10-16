import {
  getRequest,
  postRequest,
  postAuthenticatedRequest,
  putAuthenticatedRequest,
  putRequest
} from '../utils/api';
import {
  fetchPledges,
  saveTimeoutID,
  clearTimeoutID,
  postedPledge
} from '../reducers/pledgeReducer';
import { NotificationManager } from 'react-notifications';
import i18n from '../locales/i18n.js';
import { mergeEntities } from '../reducers/entitiesReducer';
import {
  userProfileSchema,
  eventPledgeSchema,
  pledgeEventSchema
} from '../schemas';
import { normalize } from 'normalizr';
import { fetchItem, saveItem } from './../stores/localStorage';
import { fetchPublicPledgesAction } from './pledgeEventsAction';
export function fetchPledgesAction(eventSlug) {
  return dispatch => {
    getRequest('pledgeEvent_get', {
      version: 'v1.3',
      eventSlug: eventSlug
    })
      .then(res => {
        dispatch(fetchPledges(res.data));
      })
      .catch(error => console.log(error));
    let timeoutID = setInterval(
      () =>
        getRequest('pledgeEvent_get', {
          version: 'v1.3',
          eventSlug: eventSlug
        })
          .then(res => {
            dispatch(fetchPledges(res.data));
          })
          .catch(error => console.log(error)),
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
            const { userProfile, eventPledge, pledgeEvent } = res.data.merge;
            dispatch(
              mergeEntities(normalize(pledgeEvent, [pledgeEventSchema]))
            );
            dispatch(
              mergeEntities(normalize(eventPledge[0], eventPledgeSchema))
            );
            dispatch(
              mergeEntities(normalize(userProfile[0], userProfileSchema))
            );
            console.log(res.data);
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
            dispatch(postedPledge(res.data));

            getLocalStorageItem('pledgedEvent', res);
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

export function updatePledge(data, params, loggedIn) {
  return () => {
    loggedIn
      ? putAuthenticatedRequest('eventPledgeAuthed_put', data, params)
          .then(res => {
            return res.data;
          })
          .catch(error => console.log(error))
      : putRequest('eventPledge_put', data, params)
          .then(res => {
            return res.data;
          })
          .catch(error => console.log(error));
  };
}

async function getLocalStorageItem(key, res) {
  const token = res.data.token;
  console.log(token);
  try {
    let pledgesArray = await fetchItem(key).catch(() => {
      saveItem(key, []);
      return [];
    });

    if (typeof pledgesArray !== 'undefined' && pledgesArray.length > 0) {
      // Already existing pledges
      let newPledgesArray = JSON.parse(pledgesArray);
      newPledgesArray.push(token);
      saveItem(key, JSON.stringify(newPledgesArray));
    } // No existing pledges
    else {
      console.log('No existing pledges found');
      pledgesArray = [];
      let newPledgesArray = pledgesArray;
      newPledgesArray.push(token);
      saveItem(key, JSON.stringify(newPledgesArray));
    }
    //console.log(showAsyncStorageContentInDev());
    fetchItem('pledgedEvent')
      .then(data => {
        if (typeof data !== 'undefined' && data.length > 0) {
          let stringPledges = JSON.parse(data);
          stringPledges = stringPledges.toString();
          fetchPublicPledgesAction(stringPledges);
        }
      })
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
}

export function clearTimeoutAction(id) {
  return dispatch => {
    clearInterval(id);
    dispatch(clearTimeoutID());
  };
}
