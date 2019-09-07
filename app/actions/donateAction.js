import { normalize } from 'normalizr';
import { debug } from '../debug/index';

import {
  postAuthenticatedRequest,
  postRequest,
  getAuthenticatedRequest
} from '../utils/api';
import { mergeEntities } from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import {
  contributionSchema,
  treecounterSchema,
  plantProjectSchema
} from '../schemas/index';
import {
  paymentSuccess,
  paymentFailed,
  paymentCleared,
  donationCreation
} from '../reducers/paymentStatus';

export function fillCard() {
  return dispatch => {
    let request = getAuthenticatedRequest('stripe_customer');
    return request;
  };
}

export function attachCardToCostumer(paymentMethod) {
  return dispatch => {
    let request = getAuthenticatedRequest('stripe_paymentMethod_attach', {
      paymentMethod
    });
    request.then(response => {
      console.log('method attached');
    });
  };
}

export function createPaymentDonation(plantProjectId, requestData, loggedIn) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = loggedIn
      ? postAuthenticatedRequest('donationCreate_post', requestData, {
          plantProject: plantProjectId
        })
      : postRequest('donationCreatePublic_post', requestData, {
          plantProject: plantProjectId
        });

    request.then(response => {
      dispatch(donationCreation(response.data.merge));
      dispatch(setProgressModelState(false));
    });
  };
}

export function handlePay(donationId, requestData, loggedIn) {
  return dispatch => {
    let request = loggedIn
      ? postAuthenticatedRequest('donationPay_post', requestData, {
          donation: donationId
        })
      : postRequest('donationPayPublic_post', requestData, {
          donation: donationId
        });
    return request;
  };
}

export function donate(donationContribution, plantProjectId, loggedIn) {
  let route = loggedIn ? 'donationContribution_post' : 'donate_post';

  return dispatch => {
    dispatch(setProgressModelState(true));
    if (
      donationContribution.paymentResponse.type &&
      donationContribution.paymentResponse.type === 'error'
    ) {
      dispatch(
        paymentFailed({
          status: false,
          message: donationContribution.paymentResponse.error.message || 'error'
        })
      );
    } else {
      let request = loggedIn
        ? postAuthenticatedRequest(route, donationContribution, {
            plantProject: plantProjectId
          })
        : postRequest(route, donationContribution, {
            plantProject: plantProjectId
          });
      request
        .then(response => {
          const { contribution, treecounter, plantProject } = response.data;
          if (
            donationContribution.paymentResponse.confirmation ===
            'iOS referred payment'
          ) {
            dispatch(
              paymentSuccess({
                status: true,
                token: contribution.token,
                message: 'success'
              })
            );
            dispatch(setProgressModelState(false));
          } else {
            dispatch(
              mergeEntities(normalize(contribution, contributionSchema))
            );
            dispatch(
              mergeEntities(normalize(plantProject, plantProjectSchema))
            );
            if (treecounter) {
              dispatch(
                mergeEntities(normalize(treecounter, treecounterSchema))
              );
            }

            dispatch(paymentSuccess({ status: true, message: 'success' }));
            dispatch(setProgressModelState(false));
            //   console.log(`Thank you for planting ${
            //     contribution.treeCount
            //   } trees with us!
            // Your donation has been registered as: ${contribution.uid}
            // You will receive an email with a donation receipt in time.
            // Green Button: "Return to Profile"`);
          }
        })
        .catch(response => {
          debug('error: ', response);
          dispatch(
            paymentFailed({
              status: false,
              message: response.response.data || 'error'
            })
          );
          dispatch(setProgressModelState(false));
        });
    }
  };
}

export function gift(donationContribution, plantProjectId, loggedIn) {
  let route = loggedIn ? 'giftDonationContribution_post' : 'giftDonate_post';

  return dispatch => {
    dispatch(setProgressModelState(true));
    if (
      donationContribution.paymentResponse.type &&
      donationContribution.paymentResponse.type === 'error'
    ) {
      dispatch(
        paymentFailed({
          status: false,
          message: donationContribution.paymentResponse.error.message || 'error'
        })
      );
    } else {
      let request = loggedIn
        ? postAuthenticatedRequest(route, donationContribution, {
            plantProject: plantProjectId
          })
        : postRequest(route, donationContribution, {
            plantProject: plantProjectId
          });
      request
        .then(response => {
          const { contribution, treecounter, plantProject } = response.data;
          if (
            donationContribution.paymentResponse.confirmation ===
            'iOS referred payment'
          ) {
            dispatch(
              paymentSuccess({
                status: true,
                token: contribution.token,
                message: 'success'
              })
            );
            dispatch(setProgressModelState(false));
          } else {
            dispatch(
              mergeEntities(normalize(contribution, contributionSchema))
            );
            dispatch(
              mergeEntities(normalize(plantProject, plantProjectSchema))
            );
            if (treecounter) {
              dispatch(
                mergeEntities(normalize(treecounter, treecounterSchema))
              );
            }

            dispatch(paymentSuccess({ status: true, message: 'success' }));
            dispatch(setProgressModelState(false));
            //   console.log(`Thank you for planting ${
            //     contribution.treeCount
            //   } trees with us!
            // Your donation has been registered as: ${contribution.uid}
            // You will receive an email with a donation receipt in time.
            // Green Button: "Return to Profile"`);
          }
        })
        .catch(response => {
          debug('error: ', response);
          dispatch(
            paymentFailed({
              status: false,
              message: response.response.data || 'error'
            })
          );
          dispatch(setProgressModelState(false));
        });
    }
  };
}

export function paymentClear() {
  return dispatch => {
    dispatch(paymentCleared());
  };
}
