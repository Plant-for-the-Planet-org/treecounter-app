import { createAction, handleActions } from 'redux-actions';

export const fetchPledges = createAction('FETCH_PLEDGES');

export const getPledges = state => state.pledges;

export const initialState = null;

const fetchPledgesReducer = handleActions(
  {
    [fetchPledges]: (state, action) => action.payload
  },
  initialState
);

export default fetchPledgesReducer;
