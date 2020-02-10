import { debug } from '../debug';
import { getRequest } from '../utils/api';
import { setPledgeEvents } from '../reducers/pledgeEventReducer';
import { eventPledgeSchema } from '../schemas';
import { normalize } from 'normalizr';
import { mergeEntities } from '../reducers/entitiesReducer';

export function fetchpledgeEventsAction() {
  return dispatch => {
    getRequest('public_pledgeEvents_get')
      .then(val => dispatch(setPledgeEvents(val.data)))
      .catch(error => debug(error));
  };
}

export function fetchPublicPledgesAction(pledgeTokens) {
  return dispatch => {
    getRequest('eventPledgesByTokenPublic_get', {
      version: 'v1.3',
      pledgeTokens: pledgeTokens
    })
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, [eventPledgeSchema])));
      })
      .catch(error => debug(error));
  };
}
