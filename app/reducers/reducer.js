import { combineReducers } from 'redux';
import commonReducers from './commonReducers';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authenticationReducer';
import currentUserProfileIdReducer from './currentUserProfileIdReducer';
import sideNavReducer from './sideNavReducer';

export default combineReducers({
  ...commonReducers,
  form: formReducer,
  authentication: authenticationReducer,
  currentUserProfileId: currentUserProfileIdReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state
});
