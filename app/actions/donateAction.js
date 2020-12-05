import { normalize } from 'normalizr';
import { debug } from '../debug';
import {
  postAuthenticatedRequest,
  postRequest,
  getAuthenticatedRequest,
  getRequest
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
  paymentCleared,
  donationCreation
} from '../reducers/paymentStatus';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import i18n from '../locales/i18n.js';

export function fillCard() {
  return (/* dispatch */) => {
    let request = getAuthenticatedRequest('stripe_customer', {
      version: 'v1.3'
    });
    return request;
  };
}

export function attachCardToCostumer(paymentMethod) {
  return (/* dispatch */) => {
    let request = postAuthenticatedRequest('stripe_paymentMethod_attach', {
      paymentMethod,
      version: 'v1.3'
    });
    request
      .then(() => {
        //debug('method attached');
      })
      .catch(error => debug(error));
  };
}

export function createPaymentDonation(plantProjectId, requestData, loggedIn) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = loggedIn
      ? postAuthenticatedRequest('donationCreate_post', requestData, {
          plantProject: plantProjectId,
          version: 'v1.3'
        })
      : postRequest('donationCreatePublic_post', requestData, {
          plantProject: plantProjectId,
          version: 'v1.3'
        });

    request
      .then(response => {
        dispatch(donationCreation(response.data.merge));
        dispatch(setProgressModelState(false));
      })
      .catch(error => {
        debug(error);
        dispatch(setProgressModelState(false));
        NotificationManager.error(
          error.response.data ? error.response.data.message : i18n.t('label.error'),
            error.response.data.errors.children.amount.errors
              ? error.response.data.errors.children.amount.errors[0]
              : i18n.t('label.error'),
          5000
        );
      });
  };
}

export function createPaymentGift(plantProjectId, requestData, loggedIn) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = loggedIn
      ? postAuthenticatedRequest('giftDonationCreate_post', requestData, {
          plantProject: plantProjectId,
          version: 'v1.3'
        })
      : postRequest('giftDonationCreatePublic_post', requestData, {
          plantProject: plantProjectId,
          version: 'v1.3'
        });

    request
      .then(response => {
        dispatch(donationCreation(response.data.merge));
        dispatch(setProgressModelState(false));
      })
      .catch(error => {
        debug(error);
        dispatch(setProgressModelState(false));
        NotificationManager.error(
          error.response.data ? error.response.data.message : i18n.t('label.error'),
            error.response.data.errors.children.amount.errors
              ? error.response.data.errors.children.amount.errors[0]
              : i18n.t('label.error'),
          5000
        );
      });
  };
}

export function handlePay(donationId, requestData, loggedIn) {
  return (/* dispatch */) => {
    requestData = { paymentProviderRequest: { ...requestData } };
    let request = loggedIn
      ? postAuthenticatedRequest('donationPay_post', requestData, {
          donation: donationId,
          version: 'v1.3'
        })
      : postRequest('donationPayPublic_post', requestData, {
          donation: donationId,
          version: 'v1.3'
        });
    return request;
  };
}

export function finalizeDonation(donationId, loggedIn) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = loggedIn
      ? getAuthenticatedRequest('donationFinalize_get', {
          donation: donationId,
          version: 'v1.3'
        })
      : getRequest('donationFinalizePublic_get', {
          donation: donationId,
          version: 'v1.3'
        });

    request
      .then(response => {
        const { contribution, treecounter, plantProject } = response.data.merge;
        dispatch(mergeEntities(normalize(contribution, [contributionSchema])));
        dispatch(mergeEntities(normalize(plantProject, [plantProjectSchema])));
        if (treecounter) {
          dispatch(mergeEntities(normalize(treecounter, [treecounterSchema])));
        }
        dispatch(paymentSuccess({ status: true, message: 'success' }));

        dispatch(setProgressModelState(false));
      })
      .catch(error => {
        debug(error);
        dispatch(setProgressModelState(false));
      });
  };
}
export function paymentClear() {
  return dispatch => {
    dispatch(paymentCleared());
  };
}

// export function donate(donationContribution, plantProjectId, loggedIn) {
//   let route = loggedIn ? 'donationContribution_post' : 'donate_post';

//   return dispatch => {
//     dispatch(setProgressModelState(true));
//     if (
//       donationContribution.paymentResponse.type &&
//       donationContribution.paymentResponse.type === 'error'
//     ) {
//       dispatch(
//         paymentFailed({
//           status: false,
//           message: donationContribution.paymentResponse.error.message || 'error'
//         })
//       );
//     } else {
//       let request = loggedIn
//         ? postAuthenticatedRequest(route, donationContribution, {
//             plantProject: plantProjectId
//           })
//         : postRequest(route, donationContribution, {
//             plantProject: plantProjectId
//           });
//       request
//         .then(response => {
//           const { contribution, treecounter, plantProject } = response.data;
//           if (
//             donationContribution.paymentResponse.confirmation ===
//             'iOS referred payment'
//           ) {
//             dispatch(
//               paymentSuccess({
//                 status: true,
//                 token: contribution.token,
//                 message: 'success'
//               })
//             );
//             dispatch(setProgressModelState(false));
//           } else {
//             dispatch(
//               mergeEntities(normalize(contribution, contributionSchema))
//             );
//             dispatch(
//               mergeEntities(normalize(plantProject, plantProjectSchema))
//             );
//             if (treecounter) {
//               dispatch(
//                 mergeEntities(normalize(treecounter, treecounterSchema))
//               );
//             }

//             dispatch(paymentSuccess({ status: true, message: 'success' }));
//             dispatch(setProgressModelState(false));
//             //   //debug(`Thank you for planting ${
//             //     contribution.treeCount
//             //   } trees with us!
//             // Your donation has been registered as: ${contribution.uid}
//             // You will receive an email with a donation receipt in time.
//             // Green Button: "Return to Profile"`);
//           }
//         })
//         .catch(response => {
//           debug('error: ', response);
//           dispatch(
//             paymentFailed({
//               status: false,
//               message: response.response.data || 'error'
//             })
//           );
//           dispatch(setProgressModelState(false));
//         });
//     }
//   };
// }

// export function gift(donationContribution, plantProjectId, loggedIn) {
//   let route = loggedIn ? 'giftDonationContribution_post' : 'giftDonate_post';

//   return dispatch => {
//     dispatch(setProgressModelState(true));
//     if (
//       donationContribution.paymentResponse.type &&
//       donationContribution.paymentResponse.type === 'error'
//     ) {
//       dispatch(
//         paymentFailed({
//           status: false,
//           message: donationContribution.paymentResponse.error.message || 'error'
//         })
//       );
//     } else {
//       let request = loggedIn
//         ? postAuthenticatedRequest(route, donationContribution, {
//             plantProject: plantProjectId
//           })
//         : postRequest(route, donationContribution, {
//             plantProject: plantProjectId
//           });
//       request
//         .then(response => {
//           const { contribution, treecounter, plantProject } = response.data;
//           if (
//             donationContribution.paymentResponse.confirmation ===
//             'iOS referred payment'
//           ) {
//             dispatch(
//               paymentSuccess({
//                 status: true,
//                 token: contribution.token,
//                 message: 'success'
//               })
//             );
//             dispatch(setProgressModelState(false));
//           } else {
//             dispatch(
//               mergeEntities(normalize(contribution, contributionSchema))
//             );
//             dispatch(
//               mergeEntities(normalize(plantProject, plantProjectSchema))
//             );
//             if (treecounter) {
//               dispatch(
//                 mergeEntities(normalize(treecounter, treecounterSchema))
//               );
//             }

//             dispatch(paymentSuccess({ status: true, message: 'success' }));
//             dispatch(setProgressModelState(false));
//             //   //debug(`Thank you for planting ${
//             //     contribution.treeCount
//             //   } trees with us!
//             // Your donation has been registered as: ${contribution.uid}
//             // You will receive an email with a donation receipt in time.
//             // Green Button: "Return to Profile"`);
//           }
//         })
//         .catch(response => {
//           debug('error: ', response);
//           dispatch(
//             paymentFailed({
//               status: false,
//               message: response.response.data || 'error'
//             })
//           );
//           dispatch(setProgressModelState(false));
//         });
//     }
//   };
// }
