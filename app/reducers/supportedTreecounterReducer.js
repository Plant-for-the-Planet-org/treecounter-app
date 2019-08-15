import { createAction, handleActions } from 'redux-actions';

export const setSupportedTreecounter = createAction(
  'SUPPORTED_TREECOUNTER_SET'
);
export const clearSupportedTreecounter = createAction(
  'SUPPORTED_TREECOUNTER_CLEAR'
);
export const getSupportedTreecounter = state => state.supportedTreecounter;

export const initialState = {
  treecounterId: null,
  displayName: null
};

const supportedTreecounterReducer = handleActions(
  {
    [setSupportedTreecounter]: (state, action) => ({
      treecounterId: action.payload.id,
      displayName: action.payload.displayName
    }),
    [clearSupportedTreecounter]: () => initialState
  },
  initialState
);

export default supportedTreecounterReducer;
