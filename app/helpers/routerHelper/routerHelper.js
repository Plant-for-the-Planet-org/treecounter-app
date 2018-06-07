import { history } from '../../components/Common/BrowserRouter';
import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, dispatch, id, params) {
  history.push({
    pathname: getLocalRoute(routeName, params),
    state: { id }
  }); // TODO: understand what this is doing}
}
