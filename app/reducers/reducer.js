import { combineReducers } from 'redux';
import commonReducers from './commonReducers';
import { reducer as formReducer } from 'redux-form';

import sideNavReducer from './sideNavReducer';

export default combineReducers({
  ...commonReducers,
  form: formReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state
});
