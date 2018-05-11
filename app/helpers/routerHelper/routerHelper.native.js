import { NavigationActions } from 'react-navigation';

export function updateRoute(routeName, dispatch, id) {
  dispatch(NavigationActions.navigate({ routeName: 'Home' }));
}
