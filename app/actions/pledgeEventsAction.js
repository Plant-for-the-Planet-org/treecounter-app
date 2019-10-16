import { getRequest } from '../utils/api';
import { setPledgeEvents } from '../reducers/pledgeEventReducer';
import { eventPledgeSchema } from '../schemas';
import { normalize } from 'normalizr';
import { mergeEntities } from '../reducers/entitiesReducer';
export function fetchpledgeEventsAction() {
  return dispatch => {
    getRequest('public_pledgeEvents_get')
      .then(val => dispatch(setPledgeEvents(val.data)))
      .catch(error => console.log(error));
  };
}

export function fetchPublicPledgesAction(pledgeTokens) {
  console.log('Function Called');
  return dispatch => {
    getRequest('eventPledgesByTokenPublic_get', {
      version: 'v1.3',
      pledgeTokens: pledgeTokens
    })
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, [eventPledgeSchema])));
        console.log('Got event by token');
      })
      .catch(error => console.log(error));
  };
}
