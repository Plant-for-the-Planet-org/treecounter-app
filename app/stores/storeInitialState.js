import { initialProps } from '../config/index';

import { initialState as entitiesState } from '../reducers/entitiesReducer';

const { mediaPath } = initialProps;

const initialState = {
  mediaPath,
  entities: entitiesState
};

export default initialState;
