const initialState = {
  contextType: '',
  giftDetails: [{}],
  donorDetails: {},
  paymentResponse: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_GIFT_CONTEXT_DETAILS':
      return {
        ...state,
        contextType: action.payload.contextType,
        giftDetails: action.payload.giftDetails
      };
    case 'SET_DONOR_DETAILS':
      return {
        ...state,
        donorDetails: action.payload.donorDetails
      };
    case 'SET_PAYMENT_RESPONSE':
      return {
        ...state,
        paymentResponse: action.payload.paymentResponse
      };
    case 'CLEAR_REDUCER':
      return initialState;
    default:
      return state;
  }
}
