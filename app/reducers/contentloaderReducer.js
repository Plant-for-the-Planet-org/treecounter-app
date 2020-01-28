import { createAction, handleActions } from 'redux-actions';

export const setContentLoaderState = createAction('CONTENT_LOADER_STATE');
export const getContentLoaderState = state =>
  state.contentloaderState.contentLoader;

export const initialState = {
  contentLoader: false
  // contentLoaderStack: []
};

const contentLoaderReducer = handleActions(
  {
    [setContentLoaderState]: (state, action) => {
      return {
        // contentLoaderStack: state.contentLoaderStack,
        contentLoader: action.payload
      };
    }
  },
  initialState
);

export default contentLoaderReducer;
