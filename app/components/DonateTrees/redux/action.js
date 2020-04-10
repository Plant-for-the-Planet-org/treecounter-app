import {
  CLEAR_DONATION_REDUCER,
  SET_CONTEXT,
  SET_DONATION_DETAILS,
  SET_DONOR_DETAILS,
  SET_GIFT_CONTEXT_DETAILS,
  SET_PAYMENT_DETAILS,
  SET_PAYMENT_RESPONSE,
  SET_PLEDGE_DETAILS,
  SET_SELECTED_PROJECT,
  SET_SUPPORT_DETAILS
} from '../../../actions/types';

export const clearDonationReducer = () => dispatch => {
  dispatch({
    type: CLEAR_DONATION_REDUCER
  });
};

export const setDonationContext = contextDetails => dispatch => {
  dispatch({
    type: SET_CONTEXT,
    payload: {
      contextDetails
    }
  });
};

export const setDonationDetails = donationDetails => dispatch => {
  dispatch({
    type: SET_DONATION_DETAILS,
    payload: {
      donationDetails
    }
  });
};

export const setDonorDetails = donorDetails => dispatch => {
  dispatch({
    type: SET_DONOR_DETAILS,
    payload: {
      donorDetails
    }
  });
};

export const setGiftContextDetails = giftContextDetails => dispatch => {
  dispatch({
    type: SET_GIFT_CONTEXT_DETAILS,
    payload: {
      ...giftContextDetails
    }
  });
};

export const setPaymentDetails = paymentDetails => dispatch => {
  dispatch({
    type: SET_PAYMENT_DETAILS,
    payload: {
      paymentDetails
    }
  });
};

export const setPaymentResponse = paymentResponse => dispatch => {
  dispatch({
    type: SET_PAYMENT_RESPONSE,
    payload: {
      paymentResponse
    }
  });
};

export const setPledgeDetails = pledgeContextDetails => dispatch => {
  dispatch({
    type: SET_PLEDGE_DETAILS,
    payload: {
      ...pledgeContextDetails
    }
  });
};

export const setSelectedProjectDetails = selectedProjectDetails => dispatch => {
  dispatch({
    type: SET_SELECTED_PROJECT,
    payload: {
      selectedProjectDetails
    }
  });
};

export const setSupportDetails = supportContextDetails => dispatch => {
  dispatch({
    type: SET_SUPPORT_DETAILS,
    payload: {
      ...supportContextDetails
    }
  });
};
