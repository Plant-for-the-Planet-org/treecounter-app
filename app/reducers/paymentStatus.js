import { createAction, handleActions } from 'redux-actions';

export const paymentSuccess = createAction('PAYMENT_SUCCESS');
export const paymentFailed = createAction('PAYMENT_FAILED');
export const paymentCleared = createAction('PAYMENT_CLEARED');

export const getPaymentStatus = state => state.paymentStatus;

export const initialState = null;

const paymentStatusReducer = handleActions(
  {
    [paymentSuccess]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [paymentFailed]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [paymentCleared]: (state, action) => {
      return initialState;
    }
  },
  initialState
);

export default paymentStatusReducer;
