import { createAction, handleActions } from 'redux-actions';

export const setSupportedTreecounterId = createAction(
  'SELECTED_TREECOUNTER_ID_SET'
);
export const getSupportedTreecounterId = state => state.supportedTreecounterId;

export const initialState = null;

const supportedTreecounterIdReducer = handleActions(
  {
    [setSupportedTreecounterId]: (state, action) => action.payload
  },
  initialState
);

export default supportedTreecounterIdReducer;
