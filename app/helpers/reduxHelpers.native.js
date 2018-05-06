import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

const drawerNavMiddleware = createReactNavigationReduxMiddleware(
  'drawerRoot',
  state => state.appDrawer
);

const drawerRootListener = createReduxBoundAddListener('drawerRoot');

export { drawerNavMiddleware, drawerRootListener };
