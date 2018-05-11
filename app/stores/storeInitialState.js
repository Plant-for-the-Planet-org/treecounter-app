import { initialProps, context } from '../config/index';

import { initialState as entitiesState } from '../reducers/entitiesReducer';

const { locale, mediaPath } = initialProps;
const { scheme, host, base: baseUrl } = context;

const initialState = {
  serverName: `${scheme}://${host}`,
  baseUrl,
  serverRendered: context.hasOwnProperty('serverSide'),
  mediaPath,
  locale,
  entities: entitiesState
};

export default initialState;
