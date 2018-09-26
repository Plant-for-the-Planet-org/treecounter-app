import { createAction, handleActions } from 'redux-actions';

export const fetchPledges = createAction('FETCH_PLEDGES');
export const saveTimeoutID = createAction('SAVE_TIMEOUT_ID');
export const clearTimeoutID = createAction('CLEAR_TIMEOUT_ID');
export const setPledgeEvents = createAction('SAVE_PLEDGE_EVENT');

export const getPledges = state => state.pledges;

export const initialState = null;

const fetchPledgesReducer = handleActions(
  {
    [fetchPledges]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [saveTimeoutID]: (state, action) => {
      return { ...state, timeoutID: action.payload };
    },
    [clearTimeoutID]: (state, action) => {
      return { ...state, timeoutID: null };
    },
    [setPledgeEvents]: (state, action) => {
      return { ...state, pledgeEvents: action.payload };
    }
  },
  initialState
);

export default fetchPledgesReducer;
