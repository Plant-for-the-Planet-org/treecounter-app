import { AppDrawerNavigator } from '../components/Navigators/DrawerConfig';
import { NavigationActions } from 'react-navigation';

const initialDrawerState = AppDrawerNavigator.router.getStateForAction(
  NavigationActions.init()
);

export function appDrawerReducer(state = initialDrawerState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppDrawerNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}
