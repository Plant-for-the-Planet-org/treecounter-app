import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, navigation, id) {
  let route = routeName;
  try {
    route = getLocalRoute(routeName);
  } catch (err) {
    console.log('routing error', err);
  }

  if (id === 0) {
    navigation.navigate('DrawerClose');
  }
  navigation.navigate(route);
}
