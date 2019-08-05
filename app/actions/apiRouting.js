const routes = require('../server/routes/fos_js_routes.json');
import Routing from './router.min.js';
import { getLocale } from './getLocale';

Routing.setRoutingData(routes);

export const getApiRoute = async (routeName, params) => {
  let locale = await getLocale();
  const serverName = `${process.env.SCHEME}://${process.env.HOST}`;
  params =
    'api_login_check' === routeName
      ? params
      : { version: 'v1.1', _locale: locale, ...params };

  const url = `${serverName}${process.env.BASE_URL}${Routing.generate(
    routeName,
    {
      ...params
    }
  )}`;
  return url;
};

export const getLocalRoute = (routeName, params) => {
  const url = `${process.env.BASE_URL}${Routing.generate(routeName, {
    ...params
  })}`;
  return url;
};

export const getImageUrl = (category, variant, imageName) => {
  return `${process.env.SCHEME}://${process.env.HOST}${
    process.env.MEDIA_PATH
  }/${category}/${variant}/${imageName}`;
};
