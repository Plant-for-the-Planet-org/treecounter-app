import { NavigationActions } from 'react-navigation';
import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, dispatch, id) {
  let route = routeName;
  try {
    route = getLocalRoute(routeName);
  } catch (err) {
    console.log('routing error', err);
  }

  if (id === 0) {
    //drawer action
    dispatch(
      NavigationActions.navigate({
        routeName: 'DrawerClose'
      })
    );
  }
  dispatch(NavigationActions.navigate({ routeName: route }));
}
