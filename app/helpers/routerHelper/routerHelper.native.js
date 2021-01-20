import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, navigation, id, params) {
  let route = routeName;
  try {
    route = getLocalRoute(routeName);
  } catch (err) {
    //debug('routing error', err);
  }

  if (id === 0) {
    navigation.closeDrawer();
  }
  if (route) navigation.navigate(route, params);
}

export function updateStaticRoute(routeName, navigation, params) {
  let route = routeName;
  navigation.navigate(route, params);
}

export function pushStaticRoute(routeName, navigation, params) {
  navigation.push(routeName, params);
}
