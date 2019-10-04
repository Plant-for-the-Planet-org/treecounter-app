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
import {
  deleteEntity,
  mergeEntities,
  unlinkEntity
} from '../reducers/entitiesReducer';
import {
  userProfileSchema,
  eventPledgeSchema,
  pledgeEventSchema
} from '../schemas';
import { normalize } from 'normalizr';
import { fetchItem, saveItem } from './../stores/localStorage';

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

            //var pledgesArray = [res.data.token, res.data.token];
            //console.log(showAsyncStorageContentInDev());

            getLocalStorageItem('pledgedEvent', res);

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

export function updatePledge(data, params, loggedIn) {
  return dispatch => {
    loggedIn
      ? putAuthenticatedRequest('eventPledgeAuthed_put', data, params).then(
          res => {
            console.log(res.data);
          }
        )
      : putRequest('eventPledge_put', data, params).then(res => {
          console.log(res.data);
        });
  };
}

async function getLocalStorageItem(key, res) {
  const token = res.data.token;
  console.log(token);
  try {
    let pledgesArray = await fetchItem(key);
    if (typeof pledgesArray !== 'undefined' && pledgesArray.length > 0) {
      let newPledgesArray = JSON.parse(pledgesArray);
      newPledgesArray.push(token);
      saveItem(key, JSON.stringify(newPledgesArray));
    } else {
      pledgesArray = [];
      let newPledgesArray = pledgesArray;
      newPledgesArray.push(token);
      saveItem(key, JSON.stringify(newPledgesArray));
    }
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
