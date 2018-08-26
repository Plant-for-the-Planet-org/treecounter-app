import { createAction, handleActions } from 'redux-actions';

export const setProgressModelState = createAction('PROGRESS_MODEL_STATE');
export const getProgressModelState = state => state.progressModel;

export const initialState = {
  progressModel: false
};

const modelDialogReducer = handleActions(
  {
    [setProgressModelState]: (state, action) => ({
      progressModel: action.payload
    })
  },
  initialState
);

export default modelDialogReducer;
