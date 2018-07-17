import { combineReducers } from 'redux';
import commonReducers from './commonReducers';
import { reducer as formReducer } from 'redux-form';

import sideNavReducer from './sideNavReducer';

const appReducer = combineReducers({
  ...commonReducers,
  form: formReducer,
  sideNav: sideNavReducer,
  mediaPath: (state = {}) => state
});

export default (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
