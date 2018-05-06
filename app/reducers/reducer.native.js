import { combineReducers } from 'redux';

import { commonReducers } from './commonReducers';
import { appDrawerReducer } from './appDrawerReducer';

export default combineReducers({
  ...commonReducers,
  appDrawer: appDrawerReducer
});
