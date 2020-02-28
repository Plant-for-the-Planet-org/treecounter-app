import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers';

const drawerNavMiddleware = createReactNavigationReduxMiddleware(
  state => state.appDrawer
);

const drawerRootListener = createReduxContainer('drawerRoot');

export { drawerNavMiddleware, drawerRootListener };
