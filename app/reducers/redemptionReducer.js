import { createAction, handleActions } from 'redux-actions';

export const validateCode = createAction('VALIDATE_CODE');
export const redemptCode = createAction('REDEMPT_CODE');

export const getValidateInfo = state => state.validateCodeInfo;
export const getRedemptionInfo = state => state.redemptCodeInfo;

export const initialState = null;

const redemptionReducer = handleActions(
  {
    [validateCode]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [redemptCode]: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
  initialState
);

export default redemptionReducer;
