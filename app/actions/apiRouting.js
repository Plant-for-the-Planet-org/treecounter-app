const routes = require('../server/routes/fos_js_routes.json');
import Routing from './router.min.js';
//import { debug } from '../debug';
import { context } from '../config';
import { getCdnMediaUrl, getWebMapIds } from './fetchConfig';
import { getLocaleAsync } from './getLocale';
Routing.setRoutingData(routes);

export const getApiRoute = async (routeName, params) => {
  const { api_url, base: baseUrl } = context;
  let locale = await getLocaleAsync();
  const serverName = `${api_url}`;
  params =
    'api_login_check' === routeName
      ? params
      : { version: 'v1.1', _locale: locale, ...params };

  const url = `${serverName}${baseUrl}${Routing.generate(routeName, {
    ...params
  })}`;
  //debug('API request:', url);
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
  return `${getCdnMediaUrl().cache}/${category}/${variant}/${imageName}`;
};

export const getPDFUrl = filename => {
  return `${getCdnMediaUrl().pdfs}/review/${filename}`;
};

export const getCountryFlagImageUrl = (countryCode, type, size) => {
  return `${
    getCdnMediaUrl().images
  }/flags/${type}/${size}/${countryCode}.${type}`;
};

export const getWebMapId = type => {
  return getWebMapIds()[type];
};
