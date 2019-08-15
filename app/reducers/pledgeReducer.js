import { createAction, handleActions } from 'redux-actions';

export const fetchPledges = createAction('FETCH_PLEDGES');
export const saveTimeoutID = createAction('SAVE_TIMEOUT_ID');
export const clearTimeoutID = createAction('CLEAR_TIMEOUT_ID');
export const pledgePosted = createAction('PLEDGE_POSTED');

export const getPledges = state => state.pledges;
export const getPostedPledges = state => state.newpledge;

export const initialState = { pledges: {} };

const fetchPledgesReducer = handleActions(
  {
    [fetchPledges]: (state, action) => {
      return { ...state, pledges: action.payload };
    },
    [pledgePosted]: (state, action) => {
      return { ...state, newpledge: action.payload };
    },
    [saveTimeoutID]: (state, action) => {
      return { ...state, timeoutID: action.payload };
    },
    [clearTimeoutID]: (state, action) => {
      return { ...state, timeoutID: null };
    }
  },
  initialState
);

export default fetchPledgesReducer;
