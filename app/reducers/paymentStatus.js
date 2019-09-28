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
    // eslint-disable-next-line no-unused-vars
    [paymentCleared]: (state, action) => {
      let returnState = { ...initialState };
      if (state && state.contribution) {
        returnState['contribution'] = state.contribution;
      }
      return returnState;
    }
  },
  initialState
);

export default paymentStatusReducer;
