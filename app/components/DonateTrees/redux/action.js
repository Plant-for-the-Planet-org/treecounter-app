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
  CLEAR_SELECTED_PROJECT,
  SET_SUPPORT_DETAILS,
  CLEAR_SUPPORT_DETAILS,
  SET_DONATION_ID
} from '../../../actions/types';
import { postAuthenticatedRequest, postRequest } from './../../../utils/api';
import i18n from './../../../locales/i18n';

import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';
import {
  contributionSchema,
  treecounterSchema,
  plantProjectSchema
} from './../../../schemas/index';
import { mergeEntities } from './../../../reducers/entitiesReducer';
import { normalize } from 'normalizr';

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

export const clearDonationContext = () => dispatch => {
  dispatch({
    type: CLEAR_CONTEXT
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

export const clearDonationDetails = () => dispatch => {
  dispatch({
    type: CLEAR_DONATION_DETAILS
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

export const clearDonorDetails = () => dispatch => {
  dispatch({
    type: CLEAR_DONOR_DETAILS
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

export const clearGiftContextDetails = () => dispatch => {
  dispatch({
    type: CLEAR_GIFT_CONTEXT_DETAILS
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

export const clearPaymentDetails = () => dispatch => {
  dispatch({
    type: CLEAR_PAYMENT_DETAILS
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

export const clearPaymentResponse = () => dispatch => {
  dispatch({
    type: CLEAR_PAYMENT_RESPONSE
  });
};

export const setPledgeDetails = pledgeContextDetails => dispatch => {
  dispatch({
    type: SET_PLEDGE_DETAILS,
    payload: {
      pledgeContextDetails
    }
  });
};

export const clearPledgeDetails = () => dispatch => {
  dispatch({
    type: CLEAR_PLEDGE_DETAILS
  });
};

export const clearSelectedProjectDetails = () => dispatch => {
  dispatch({
    type: CLEAR_SELECTED_PROJECT
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

export const clearSupportDetails = () => dispatch => {
  dispatch({
    type: CLEAR_SUPPORT_DETAILS
  });
};

export function createDonation(data, plantProject, loggedIn, donationType) {
  return dispatch =>
    new Promise(function(resolve, reject) {
      {
        loggedIn
          ? donationType === 'gift'
            ? postAuthenticatedRequest('giftDonationCreate_post', data, {
                version: 'v1.4',
                plantProject: plantProject
              })
                .then(res => {
                  dispatch({
                    type: SET_DONATION_ID,
                    payload: res.data.donationId
                  });
                  resolve(res);
                })
                .catch(error => {
                  NotificationManager.error(
                    error.response.data.message,
                    i18n.t('label.error'),
                    5000
                  );
                })
            : postAuthenticatedRequest('donationCreate_post', data, {
                version: 'v1.4',
                plantProject: plantProject
              })
                .then(res => {
                  dispatch({
                    type: SET_DONATION_ID,
                    payload: res.data.donationId
                  });
                  resolve(res);
                })
                .catch(error => {
                  reject(error);
                  console.log('Error', error);
                  NotificationManager.error(
                    error.response.data.message,
                    i18n.t('label.error'),
                    5000
                  );
                })
          : donationType === 'gift'
          ? postRequest('giftDonationCreatePublic_post', data, {
              version: 'v1.4',
              plantProject: plantProject
            })
              .then(res => {
                dispatch({
                  type: SET_DONATION_ID,
                  payload: res.data.donationId
                });
                resolve(res);
              })
              .catch(error => {
                NotificationManager.error(
                  error.response.data.message,
                  i18n.t('label.error'),
                  5000
                );
              })
          : postRequest('donationCreatePublic_post', data, {
              version: 'v1.4',
              plantProject: plantProject
            })
              .then(res => {
                dispatch({
                  type: SET_DONATION_ID,
                  payload: res.data.donationId
                });
                resolve(res);
              })
              .catch(error => {
                NotificationManager.error(
                  error.response.data.message,
                  i18n.t('label.error'),
                  5000
                );
              });
      }
    });
}

export function donationPay(data, donationID, loggedIn) {
  return dispatch =>
    new Promise(function(resolve) {
      {
        loggedIn
          ? postAuthenticatedRequest('donationPay_post', data, {
              version: 'v1.5',
              donation: donationID
            })
              .then(res => {
                const {
                  contribution,
                  treecounter,
                  plantProject
                } = res.data.merge;
                dispatch(
                  mergeEntities(normalize(contribution, [contributionSchema]))
                );
                dispatch(
                  mergeEntities(normalize(plantProject, [plantProjectSchema]))
                );
                dispatch(
                  mergeEntities(normalize(treecounter, [treecounterSchema]))
                );
                resolve(res);
              })
              .catch(error => {
                NotificationManager.error(
                  error.response.data.message,
                  i18n.t('label.error'),
                  5000
                );
              })
          : postRequest('donationPayPublic_post', data, {
              version: 'v1.5',
              donation: donationID
            })
              .then(res => {
                const { contribution, plantProject } = res.data.merge;
                dispatch(
                  mergeEntities(normalize(contribution, [contributionSchema]))
                );
                dispatch(
                  mergeEntities(normalize(plantProject, [plantProjectSchema]))
                );
                resolve(res);
              })
              .catch(error => {
                NotificationManager.error(
                  error.res.data.message,
                  i18n.t('label.error'),
                  5000
                );
              });
      }
    });
}
