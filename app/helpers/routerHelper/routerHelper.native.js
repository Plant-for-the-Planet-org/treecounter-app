import { NavigationActions } from 'react-navigation';
import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, dispatch, id) {
  const route = getLocalRoute(routeName);
  dispatch(NavigationActions.navigate({ routeName: route }));
}
