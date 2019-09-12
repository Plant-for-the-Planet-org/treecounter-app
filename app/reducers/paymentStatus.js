import { createAction, handleActions } from 'redux-actions';

export const paymentSuccess = createAction('PAYMENT_SUCCESS');
export const paymentFailed = createAction('PAYMENT_FAILED');
export const paymentCleared = createAction('PAYMENT_CLEARED');
export const donationCreation = createAction('CREATE_DONATION');

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
    [donationCreation]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [paymentCleared]: (state, action) => {
      return { ...initialState, contribution: state.contribution };
    }
  },
  initialState
);

export default paymentStatusReducer;
