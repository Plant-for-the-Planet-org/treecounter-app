import { normalize } from 'normalizr';
import { debug } from '../debug/index';
import { postAuthenticatedRequest, postRequest } from '../utils/api';
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
  paymentCleared
} from '../reducers/paymentStatus';

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
          message: donationContribution.paymentResponse.error.message
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
            paymentFailed({ status: false, message: response.response.data })
          );
          dispatch(setProgressModelState(false));
        });
    }
  };
}

export function gift(donationContribution, plantProjectId, loggedIn) {
  let route = loggedIn ? 'giftDonationContribution_post' : 'giftDonate_post';

  return dispatch => {
    if (
      donationContribution.paymentResponse.type &&
      donationContribution.paymentResponse.type === 'error'
    ) {
      dispatch(
        paymentFailed({
          status: false,
          message: donationContribution.paymentResponse.error.message
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
          const treecounter = response.data;
          // a SchemaResponse with a contribution and a treecounter entity should be merged
          // the response will also include the donationUid, required to redirect to the success page
          const [contribution] = treecounter.contributions.splice(-1);
          dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));

          // console.log(`Thank you for planting ${
          //   contribution.treeCount
          // } trees with us!
          // Your donation has been registered as: ${contribution.uid}
          // You will receive an email with a donation receipt in time.
          // Green Button: "Return to Profile"`);
        })
        .catch(response => {
          debug('error: ', response);
        });
    }
  };
}

export function paymentClear() {
  return dispatch => {
    dispatch(paymentCleared());
  };
}
