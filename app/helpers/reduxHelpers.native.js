import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

const drawerNavMiddleware = createReactNavigationReduxMiddleware(
  'drawerRoot',
  state => state.drawerNav
);

const drawerRootListener = createReduxBoundAddListener('drawerRoot');

export { drawerNavMiddleware, drawerRootListener };
