import {
  CLEAR_DONATION_REDUCER,
  SET_CONTEXT,
  SET_DONATION_DETAILS,
  SET_DONOR_DETAILS,
  SET_GIFT_CONTEXT_DETAILS,
  SET_PAYMENT_DETAILS,
  SET_PAYMENT_RESPONSE,
  SET_PLEDGE_DETAILS,
  SET_SUPPORT_DETAILS
} from '../../../actions/types';

const initialState = {
  contextDetails: '', // 'gift', 'support', 'pledge', 'direct'
  giftDetails: [{}], // Array of Gift Details - firstname, lastname, email, message, treecount
  supportTreeCounterDetails: {}, // Supported Treecounter id
  pledgeDetails: {}, // Pledge Details
  donationDetails: {}, // Project details, selected Tree count, frequency
  donorDetails: {}, // Contact details of the Donor
  paymentResponse: {}, // Payment response from the server
  paymentDetails: {} // Payment mode and the details
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_DONATION_REDUCER:
      return initialState;

    case SET_CONTEXT:
      return {
        ...state,
        contextDetails: action.payload.contextDetails
      };

    case SET_DONATION_DETAILS:
      return {
        ...state,
        donationDetails: action.payload.donationDetails
      };

    case SET_DONOR_DETAILS:
      return {
        ...state,
        donorDetails: action.payload.donorDetails
      };

    case SET_GIFT_CONTEXT_DETAILS:
      return {
        ...state,
        contextDetails: action.payload.contextDetails,
        giftDetails: action.payload.giftDetails
      };

    case SET_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: action.payload.paymentDetails
      };

    case SET_PAYMENT_RESPONSE:
      return {
        ...state,
        paymentResponse: action.payload.paymentResponse
      };

    case SET_PLEDGE_DETAILS:
      return {
        ...state,
        contextDetails: action.payload.contextDetails,
        pledgeDetails: action.payload.pledgeDetails
      };

    case SET_SUPPORT_DETAILS:
      return {
        ...state,
        contextDetails: action.payload.contextDetails,
        supportTreeCounterDetails: action.payload.supportTreeCounterDetails
      };
    default:
      return state;
  }
}
