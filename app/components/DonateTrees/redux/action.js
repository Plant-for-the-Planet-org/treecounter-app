import { CLEAR_DONATION_REDUCER, SET_CONTEXT, SET_DONATION_DETAILS, SET_DONOR_DETAILS, SET_GIFT_CONTEXT_DETAILS, SET_PAYMENT_DETAILS, SET_PAYMENT_RESPONSE, SET_PLEDGE_DETAILS, SET_SELECTED_PROJECT, SET_SUPPORT_DETAILS, SET_DONATION_ID } from '../../../actions/types';
import { postAuthenticatedRequest, postRequest } from './../../../utils/api'
import i18n from './../../../locales/i18n';

import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

export const clearDonationReducer = () => dispatch => {
  dispatch({
    type: CLEAR_DONATION_REDUCER
  });
};

export const setDonationContext = contextDetails => dispatch => {
  dispatch({
    type: SET_CONTEXT,
    payload: contextDetails
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

// data has to be in the following format - 
// {
//   "amount": 50,
//   "currency": "EUR",
//   "recipientType": "individual",
//   "treeCount": 50,
//   "receiptIndividual": {
//       "firstname": "jvjmv",
//       "lastname": "hghg",
//       "email": "hgj@hh.com",
//       "address": "ihh",
//       "zipCode": "134003",
//       "city": "gfjyfgh",
//       "country": "IN"
//   }
// }
export function createDonation(data, plantProject, loggedIn, donationType) {
  return dispatch => {
    loggedIn
      ?
      donationType === 'gift' ?
        postAuthenticatedRequest('giftDonationCreate_post', data, {
          version: 'v1.4',
          plantProject: plantProject
        }).then(res => {
          console.log(res.data);
        }).catch(error => {
          NotificationManager.error(
            error.response.data.message,
            i18n.t('label.error'),
            5000
          );
        })
        :
        postAuthenticatedRequest('donationCreate_post', data, {
          version: 'v1.4',
          plantProject: plantProject
        }).then(res => {
          console.log('Entered in Create donation')
          // dispatch({
          //   type: SET_DONATION_ID,
          //   payload: res.data.donationId
          // });
        }).catch(error => {
          console.log('Error', error)
          NotificationManager.error(
            error.response.data.message,
            i18n.t('label.error'),
            5000
          );
        })
      :
      donationType === 'gift' ?
        postRequest('giftDonationCreatePublic_post', data, {
          version: 'v1.4',
          plantProject: plantProject
        })
          .then(res => {
            console.log('Donation ID', res.data.donationId);
          })
          .catch(error => {
            NotificationManager.error(
              error.response.data.message,
              i18n.t('label.error'),
              5000
            );
          })
        :
        postRequest('donationCreatePublic_post', data, {
          version: 'v1.4',
          plantProject: plantProject
        })
          .then(res => {
            console.log('Donation ID', res.data.donationId);
          })
          .catch(error => {
            NotificationManager.error(
              error.response.data.message,
              i18n.t('label.error'),
              5000
            );
          })
  };
}

// data has to be in the following format - 
// {
//   "paymentProviderRequest": {
//       "account": "acct_1Ajup2JruhzYVufP",
//       "gateway": "stripe",
//       "source": {
//           "id": "pm_1FId4pGhHD5xN1UqvYpFtj5c",
//           "object": "payment_method"
//       }
//   }
// }
export function donationPay(data, donationID, loggedIn) {
  return dispatch => {
    loggedIn
      ? postAuthenticatedRequest('donationPay_post', data, {
        version: 'v1.4',
        donationID: donationID
      })
        .then(res => {
          console.log('Then Donation Pay', res.data)
        })
        .catch(error => {
          console.log('Catch Donation Pay', error)
          NotificationManager.error(
            error.response.data.message,
            i18n.t('label.error'),
            5000
          );
        })
      : postRequest('donationPayPublic_post', data, {
        version: 'v1.4',
        donationID: donationID
      })
        .then(res => {
          console.log('Then Donation Pay', res.data)
        })
        .catch(error => {
          console.log('Catch Donation Pay', error)
          NotificationManager.error(
            error.response.data.message,
            i18n.t('label.error'),
            5000
          );
        });
  };
}

