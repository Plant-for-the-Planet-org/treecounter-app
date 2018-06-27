import { combineReducers } from 'redux';

import commonReducers from './commonReducers';
import { createAction } from 'redux-actions';
import { appDrawerReducer } from './appDrawerReducer';

export const userLogout = createAction('USER_LOGOUT');

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
