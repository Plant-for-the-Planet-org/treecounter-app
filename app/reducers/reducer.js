import { combineReducers } from 'redux';
import commonReducers from './commonReducers';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authenticationReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';

import selectedPlantProjectIdReducer from './selectedPlantProjectIdReducer';
import supportedTreecounterReducer from './supportedTreecounterReducer';

import sideNavReducer from './sideNavReducer';

export default combineReducers({
  ...commonReducers,
  form: formReducer,
  authentication: authenticationReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  selectedPlantProjectId: selectedPlantProjectIdReducer,
  supportedTreecounter: supportedTreecounterReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state
});
