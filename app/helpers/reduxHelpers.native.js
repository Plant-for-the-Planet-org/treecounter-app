import {
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

const drawerNavMiddleware = createReactNavigationReduxMiddleware(
  state => state.appDrawer
);

export { drawerNavMiddleware };
