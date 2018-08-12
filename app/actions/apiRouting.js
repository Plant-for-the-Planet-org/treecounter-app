const routes = require('../server/routes/fos_js_routes.json');

import Routing from './router.min.js';
import { context, initialProps } from '../config';

Routing.setRoutingData(routes);

export const getApiRoute = async (routeName, params) => {
  const { scheme, host, base: baseUrl } = context;
  let locale;
  if (navigator) {
    let userLang = navigator.language || navigator.userLanguage;
    locale = userLang.split('-')[0];
  } else {
    locale = await getLanguages.then(languages => {
      languages[0].split('-')[0]; // ['en-US', 'en']
    });
  }
  const serverName = `${scheme}://${host}`;
  params =
    'api_login_check' === routeName
      ? params
      : { version: 'v1.0', _locale: locale, ...params };

  const url = `${serverName}${baseUrl}${Routing.generate(routeName, {
    ...params
  })}`;
  return url;
};

export const getLocalRoute = (routeName, params) => {
  const { base: baseUrl } = context;

  const url = `${baseUrl}${Routing.generate(routeName, {
    ...params
  })}`;
  return url;
};

export const getImageUrl = (category, variant, imageName) => {
  const { scheme, host } = context;
  return `${scheme}://${host}/media/cache/${category}/${variant}/${imageName}`;
};
