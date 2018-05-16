const routes = require('../server/routes/fos_js_routes.json');

import Routing from './router.min.js';
import { context, initialProps } from '../config/index';
import { debug } from '../debug';

Routing.setRoutingData(routes);

export const getApiRoute = (routeName, params) => {
  const { scheme, host, base: baseUrl } = context;
  const { locale } = initialProps;
  const serverName = `${scheme}://${host}`;
  debug(
    'route context:',
    `serverName: ${serverName}, baseUrl: ${baseUrl}, locale: ${locale}`
  );

  const url = `${serverName}${baseUrl}${Routing.generate(routeName, {
    _locale: locale,
    ...params
  })}`;
  debug(`generated route from '${routeName}': ${url}`);
  return url;
};

export const getLocalRoute = (routeName, params) => {
  debug('enter local route');
  const { base: baseUrl } = context;
  const { locale } = initialProps;
  debug('route context:', `baseUrl: ${baseUrl}, locale: ${locale}`);

  const url = `${baseUrl}${Routing.generate(routeName, {
    _locale: locale,
    ...params
  })}`;
  debug(`generated route from '${routeName}': ${url}`);
  return url;
};
