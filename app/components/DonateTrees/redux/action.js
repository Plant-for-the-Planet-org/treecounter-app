import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  CLEAR_DONATION_REDUCER,
  SET_CONTEXT,
  SET_DONATION_DETAILS,
  SET_DONOR_DETAILS,
  SET_GIFT_CONTEXT_DETAILS,
  SET_PAYMENT_DETAILS,
  SET_PAYMENT_RESPONSE,
  SET_PLEDGE_DETAILS
} from '../../../actions/types';
const dispatch = useDispatch();

// export const clearDonationReducer = () => dispatch => {
//   dispatch({
//     type: CLEAR_DONATION_REDUCER
//   });
// };

export const clearDonationReducer = useCallback(
  () => dispatch({ type: CLEAR_DONATION_REDUCER }),
  [dispatch]
);

// export const setDonationContext = contextDetails => dispatch => {
//   dispatch({
//     type: SET_CONTEXT,
//     payload: {
//       contextDetails
//     }
//   });
// };

export const setDonationContext = useCallback(
  contextDetails =>
    dispatch({
      type: SET_CONTEXT,
      payload: {
        contextDetails
      }
    }),
  [dispatch]
);

// export const setDonationDetails = donationDetails => dispatch => {
//   dispatch({
//     type: SET_DONATION_DETAILS,
//     payload: {
//       donationDetails
//     }
//   });
// };

export const setDonationDetails = useCallback(
  donationDetails =>
    dispatch({
      type: SET_DONATION_DETAILS,
      payload: {
        donationDetails
      }
    }),
  [dispatch]
);

// export const setDonorDetails = donorDetails => dispatch => {
//   dispatch({
//     type: SET_DONOR_DETAILS,
//     payload: {
//       donorDetails
//     }
//   });
// };

export const setDonorDetails = useCallback(
  donorDetails =>
    dispatch({
      type: SET_DONOR_DETAILS,
      payload: {
        donorDetails
      }
    }),
  [dispatch]
);

// export const setGiftContextDetails = giftContextDetails => dispatch => {
//   dispatch({
//     type: SET_GIFT_CONTEXT_DETAILS,
//     payload: {
//       ...giftContextDetails
//     }
//   });
// };

export const setGiftContextDetails = useCallback(
  giftContextDetails =>
    dispatch({
      type: SET_GIFT_CONTEXT_DETAILS,
      payload: {
        ...giftContextDetails
      }
    }),
  [dispatch]
);

// export const setPaymentDetails = paymentDetails => dispatch => {
//   dispatch({
//     type: SET_PAYMENT_DETAILS,
//     payload: {
//       paymentDetails
//     }
//   });
// };

export const setPaymentDetails = useCallback(
  paymentDetails =>
    dispatch({
      type: SET_PAYMENT_DETAILS,
      payload: {
        paymentDetails
      }
    }),
  [dispatch]
);

// export const setPaymentResponse = paymentResponse => dispatch => {
//   dispatch({
//     type: SET_PAYMENT_RESPONSE,
//     payload: {
//       paymentResponse
//     }
//   });
// };

export const setPaymentResponse = useCallback(
  paymentResponse =>
    dispatch({
      type: SET_PAYMENT_RESPONSE,
      payload: {
        paymentResponse
      }
    }),
  [dispatch]
);

// export const setPledgeDetails = pledgeContextDetails => dispatch => {
//   dispatch({
//     type: SET_PLEDGE_DETAILS,
//     payload: {
//       ...pledgeContextDetails
//     }
//   });
// };

export const setPledgeDetails = useCallback(
  pledgeContextDetails =>
    dispatch({
      type: SET_PLEDGE_DETAILS,
      payload: {
        ...pledgeContextDetails
      }
    }),
  [dispatch]
);

// export const setSupportDetails = supportContextDetails => dispatch => {
//   dispatch({
//     type: SET_PLEDGE_DETAILS,
//     payload: {
//       ...supportContextDetails
//     }
//   });
// };

export const setSupportDetails = useCallback(
  supportContextDetails =>
    dispatch({
      type: SET_PLEDGE_DETAILS,
      payload: {
        ...supportContextDetails
      }
    }),
  [dispatch]
);
