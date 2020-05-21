import {
  CLEAR_DONATION_REDUCER,
  SET_CONTEXT,
  CLEAR_CONTEXT,
  SET_DONATION_DETAILS,
  CLEAR_DONATION_DETAILS,
  SET_DONOR_DETAILS,
  CLEAR_DONOR_DETAILS,
  SET_GIFT_CONTEXT_DETAILS,
  CLEAR_GIFT_CONTEXT_DETAILS,
  SET_PAYMENT_DETAILS,
  CLEAR_PAYMENT_DETAILS,
  SET_PAYMENT_RESPONSE,
  CLEAR_PAYMENT_RESPONSE,
  SET_PLEDGE_DETAILS,
  CLEAR_PLEDGE_DETAILS,
  SET_SELECTED_PROJECT,
  CLEAR_SELECTED_PROJECT,
  SET_SUPPORT_DETAILS,
  CLEAR_SUPPORT_DETAILS,
  SET_DONATION_ID
} from '../../../actions/types';

const initialState = {
  contextType: null, // 'gift', 'support', 'pledge', 'direct'
  giftDetails: [], // Array of Gift Details - firstname, lastname, email, message, treecount
  supportTreeCounterDetails: {}, // Supported Treecounter id
  pledgeDetails: {}, // Pledge Details
  donationDetails: {}, // total Tree count, frequency, tax receipt
  donorDetails: {}, // Contact details of the Donor
  paymentResponse: {}, // Payment response from the server
  paymentDetails: {}, // Payment mode and the details
  projectDetails: {}, // Selected project details
  donationID: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_DONATION_REDUCER:
      return initialState;

    case SET_CONTEXT:
      return {
        ...state,
        contextType: action.payload
      };

    case CLEAR_CONTEXT:
      return {
        ...state,
        contextType: null
      };

    case SET_DONATION_DETAILS:
      return {
        ...state,
        donationDetails: action.payload.donationDetails
      };

    case CLEAR_DONATION_DETAILS:
      return {
        ...state,
        donationDetails: {}
      };

    case SET_DONOR_DETAILS:
      return {
        ...state,
        donorDetails: action.payload.donorDetails
      };

    case CLEAR_DONOR_DETAILS:
      return {
        ...state,
        donorDetails: {}
      };

    case SET_GIFT_CONTEXT_DETAILS:
      return {
        ...state,
        contextType: action.payload.contextType,
        giftDetails: action.payload.giftDetails
      };

    case CLEAR_GIFT_CONTEXT_DETAILS:
      return {
        ...state,
        contextType: null,
        giftDetails: []
      };

    case SET_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: action.payload.paymentDetails
      };

    case CLEAR_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: {}
      };

    case SET_PAYMENT_RESPONSE:
      return {
        ...state,
        paymentResponse: action.payload.paymentResponse
      };

    case CLEAR_PAYMENT_RESPONSE:
      return {
        ...state,
        paymentResponse: {}
      };

    case SET_PLEDGE_DETAILS:
      return {
        ...state,
        pledgeDetails: action.payload.pledgeContextDetails
      };

    case CLEAR_PLEDGE_DETAILS:
      return {
        ...state,
        pledgeDetails: {}
      };

    case SET_SELECTED_PROJECT:
      return {
        ...state,
        projectDetails: action.payload.selectedProjectDetails
      };

    case CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        projectDetails: {}
      };

    case SET_SUPPORT_DETAILS:
      return {
        ...state,
        contextType: action.payload.contextType,
        supportTreeCounterDetails: action.payload.supportTreeCounterDetails
      };

    case CLEAR_SUPPORT_DETAILS:
      return {
        ...state,
        contextType: null,
        supportTreeCounterDetails: {}
      };

    case SET_DONATION_ID:
      return {
        ...state,
        donationID: action.payload
      };

    default:
      return state;
  }
}
