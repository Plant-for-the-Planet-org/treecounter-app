const routes = require('../server/routes/fos_js_routes.json');

import Routing from './router.min.js';
import { getStore } from '../components/App';
import { debug } from '../debug';

Routing.setRoutingData(routes);

export const getApiRoute = (routeName, params) => {
  const { serverName, baseUrl, locale } = getStore().getState();
  debug(
    'route context:',
    `serverName: ${serverName}, baseUrl: ${baseUrl}, locale: ${locale}`
  );

  const host = serverName;

  const url = `${host}${baseUrl}${Routing.generate(routeName, {
    _locale: locale,
    ...params
  })}`;
  debug(`generated route from '${routeName}': ${url}`);
  return url;
};

export const getLocalRoute = (routeName, params) => {
  const { baseUrl, locale } = getStore().getState();
  debug('route context:', `baseUrl: ${baseUrl}, locale: ${locale}`);

  const url = `${baseUrl}${Routing.generate(routeName, {
    _locale: locale,
    ...params
  })}`;
  debug(`generated route from '${routeName}': ${url}`);
  return url;
};
