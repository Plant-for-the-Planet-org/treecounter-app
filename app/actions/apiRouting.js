const routes = require('../server/routes/fos_js_routes.json');
import Routing from './router.min.js';
import { debug } from '../debug';
import { context } from '../config';
import { getCdnMediaUrl } from './fetchConfig';
import { getLocaleAsync } from './getLocale';
Routing.setRoutingData(routes);

export const getApiRoute = async (routeName, params) => {
  const { scheme, host, base: baseUrl } = context;
  let locale = await getLocaleAsync();
  debug('-------------------- Api calling with ', locale);
  const serverName = `${scheme}://${host}`;
  params =
    'api_login_check' === routeName
      ? params
      : { version: 'v1.1', _locale: locale, ...params };

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
  // const { scheme, host } = context;
  // debug(getCdnMediaUrl());

  return `${getCdnMediaUrl().cache}/${category}/${variant}/${imageName}`;
};

export const getPDFUrl = filename => {
  // const { scheme, host } = context;
  return `${getCdnMediaUrl().pdfs}/review/${filename}`;
};

export const getCountryFlagImageUrl = (countryCode, type, size) => {
  // const { scheme, host } = context;
  return `${
    getCdnMediaUrl().images
  }/flags/${type}/${size}/${countryCode}.${type}`;
};
