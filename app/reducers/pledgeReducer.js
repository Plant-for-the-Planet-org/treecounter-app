import { createAction, handleActions } from 'redux-actions';

export const fetchPledges = createAction('FETCH_PLEDGES');
export const postedPledge = createAction('POSTED_PLEDGES');
export const saveTimeoutID = createAction('SAVE_TIMEOUT_ID');
export const clearTimeoutID = createAction('CLEAR_TIMEOUT_ID');

export const getPledges = state => state.pledges;
export const getPostedPledges = state => state.postedPledges;

export const initialState = null;

const fetchPledgesReducer = handleActions(
  {
    [fetchPledges]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [postedPledge]: (state, action) => {
      return { ...state, postedPledges: action.payload };
    },
    [saveTimeoutID]: (state, action) => {
      return { ...state, timeoutID: action.payload };
    },
    [clearTimeoutID]: (state /* , action */) => {
      return { ...state, timeoutID: null };
    }
  },
  initialState
);

export default fetchPledgesReducer;
