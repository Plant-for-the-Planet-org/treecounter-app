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
  displayName: null,
  slug: null,
};

const supportedTreecounterReducer = handleActions(
  {
    [setSupportedTreecounter]: (state, action) => ({
      treecounterId: action.payload.id,
      type: action.payload.type,
      displayName: action.payload.displayName,
      slug: action.payload.slug,
    }),
    [clearSupportedTreecounter]: () => initialState
  },
  initialState
);

export default supportedTreecounterReducer;
