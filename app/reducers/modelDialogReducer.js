import { createAction, handleActions } from 'redux-actions';

export const setProgressModelState = createAction('PROGRESS_MODEL_STATE');
export const getProgressModelState = state => state.progressModel;

export const initialState = {
  progressModel: false,
  progressModelStack: []
};

const modelDialogReducer = handleActions(
  {
    [setProgressModelState]: (state, action) => {
      if (!action.payload) {
        state.progressModelStack.pop();
        if (state.progressModelStack.length > 0) {
          return {
            progressModelStack: state.progressModelStack,
            progressModel: true
          };
        }
        return {
          progressModelStack: state.progressModelStack,
          progressModel: false
        };
      }
      state.progressModelStack.push(action.payload);
      return {
        progressModelStack: state.progressModelStack,
        progressModel: action.payload
      };
    }
  },
  initialState
);

export default modelDialogReducer;
