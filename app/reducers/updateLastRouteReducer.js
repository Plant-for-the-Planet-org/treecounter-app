import { createAction, handleActions } from 'redux-actions';

export const setLastRoute = createAction('SET_LAST_ROUTE');
export const getLastRoute = state => state.lastRoute;

export const initialState = {
  lastRoute: {}
};

const updateLastRouteReducer = handleActions(
  {
    [setLastRoute]: (state, action) => ({
      lastRoute: action.payload
    })
  },
  initialState
);

export default updateLastRouteReducer;
