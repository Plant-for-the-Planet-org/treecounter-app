import { history } from '../../components/Common/BrowserRouter';
import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, dispatch, id) {
  history.push({
    pathname: getLocalRoute(routeName),
    state: { id }
  }); // TODO: understand what this is doing}
}
