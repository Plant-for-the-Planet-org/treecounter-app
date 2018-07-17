import { combineReducers } from 'redux';

import commonReducers from './commonReducers';
import { appDrawerReducer } from './appDrawerReducer';

const appReducer = combineReducers({
  ...commonReducers,
  appDrawer: appDrawerReducer
});

export default (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
