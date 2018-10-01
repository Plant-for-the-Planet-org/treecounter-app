import { createAction, handleActions } from 'redux-actions';

export const setPledgeEvents = createAction('SAVE_PLEDGE_EVENT');

export const getPledgeEvents = state => state.pledgeEvents;

export const initialState = null;

const pledgeEventReducer = handleActions(
  {
    [setPledgeEvents]: (state, action) => {
      return { ...state, pledgeEvents: action.payload };
    }
  },
  initialState
);

export default pledgeEventReducer;
