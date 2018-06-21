import { createAction, handleActions } from 'redux-actions';
import merge from 'lodash/merge';
import { debug } from '../debug/index';

export const initialState = {
  userProfile: null,
  contribution: {},
  tpo: {},
  plantProject: {},
  paymentGateway: {},
  treecounter: {},
  plantProjectImage: {},
  plantContributionImage: {}
};

export const getUserProfiles = state => state.entities.userProfile;
export const getContributions = state => state.entities.contribution;
export const getTpos = state => state.entities.tpo;
export const getPlantProjects = state => state.entities.plantProject;
export const getPaymentGateways = state => state.entities.paymentGateway;
export const getTreecounters = state => state.entities.treecounter;

export const mergeEntities = createAction('ENTITIES_MERGE');
export const deleteEntity = createAction('ENTITY_DELETE');

export default handleActions(
  {
    ENTITIES_MERGE: (state, action) => {
      debug('Merging entities');
      if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities);
      }

      return state;
    },
    ENTITY_DELETE: (state, action) => {
      debug('Deleting entity');
      state = { ...state };

      Object.keys(action.payload).forEach(entity => {
        let entityIds = action.payload[entity].map(String);
        state[entity] = Object.keys(state[entity])
          .filter(key => !entityIds.includes(key))
          .reduce((p, id) => ({ ...p, [id]: state[entity][id] }), {});
      });

      return state;
    }
  },
  initialState
);
