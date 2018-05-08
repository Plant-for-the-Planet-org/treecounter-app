import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authenticationReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterIdReducer from './supportedTreecounterIdReducer';
import entitiesReducer from './entitiesReducer';
import sideNavReducer from './sideNavReducer';

export default combineReducers({
  form: formReducer,
  entities: entitiesReducer,
  authentication: authenticationReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  supportedTreecounterId: supportedTreecounterIdReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state,
  locale: (state = {}) => state,
  baseUrl: (state = {}) => state,
  serverName: (state = {}) => state,
  location: (state = {}) => state,
  serverRendered: (state = {}) => state
});
