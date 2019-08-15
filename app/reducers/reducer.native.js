import { combineReducers } from 'redux';

import commonReducers from './commonReducers';

const appReducer = combineReducers({
  ...commonReducers
});

export default (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
