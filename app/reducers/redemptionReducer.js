import { createAction, handleActions } from 'redux-actions';

export const validateCode = createAction('VALIDATE_CODE');

export const getValidateInfo = state => state.validateCodeInfo;

export const initialState = null;

const redemptionReducer = handleActions(
  {
    [validateCode]: (state, action) => {
      return { ...state, validateCodeInfo: action.payload };
    }
  },
  initialState
);

export default redemptionReducer;
