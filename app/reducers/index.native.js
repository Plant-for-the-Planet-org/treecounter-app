import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { appDrawerReducer } from './appDrawerReducer';
import authenticationReducer from './authenticationReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import entitiesReducer from './entitiesReducer';
import sideNavReducer from './sideNavReducer';

export default combineReducers({
  appDrawer: appDrawerReducer,
  form: formReducer,
  entities: entitiesReducer,
  authentication: authenticationReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state,
  locale: (state = {}) => state,
  baseUrl: (state = {}) => state,
  serverName: (state = {}) => state,
  location: (state = {}) => state,
  serverRendered: (state = {}) => state
});
