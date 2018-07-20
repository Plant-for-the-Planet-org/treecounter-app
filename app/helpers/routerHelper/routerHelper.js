import { history } from '../../components/Common/BrowserRouter';
import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, dispatch, id, params, search) {
  history.push({
    pathname: getLocalRoute(routeName, params),
    state: { id },
    search
  }); // TODO: understand what this is doing}
}
