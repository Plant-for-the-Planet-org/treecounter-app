import { normalize } from 'normalizr';
import { debug } from '../debug/index';
import { postAuthenticatedRequest, postRequest } from '../utils/api';
import { mergeEntities } from '../reducers/entitiesReducer';
import {
  contributionSchema,
  treecounterSchema,
  plantProjectSchema
} from '../schemas/index';

export function donate(donationContribution, plantProjectId, loggedIn) {
  console.log(
    '+++++++++++++ Donation Processing ',
    donationContribution,
    plantProjectId
  );
  let route = loggedIn ? 'donationContribution_post' : 'donate_post';
  let request = loggedIn
    ? postAuthenticatedRequest(route, donationContribution, {
        plantProject: plantProjectId
      })
    : postRequest(route, donationContribution, {
        plantProject: plantProjectId
      });
  return dispatch => {
    request
      .then(response => {
        const { contribution, treecounter, plantProject } = response.data;

        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        dispatch(mergeEntities(normalize(plantProject, plantProjectSchema)));
        if (treecounter) {
          dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        }
        console.log(contribution.uid);

        console.log(`Thank you for planting ${
          contribution.treeCount
        } trees with us!
          Your donation has been registered as: ${contribution.uid}
          You will receive an email with a donation receipt in time.
          Green Button: "Return to Profile"`);
      })
      .catch(response => {
        debug('error: ', response);
      });
  };
}

export function gift(donationContribution, plantProjectId, loggedIn) {
  console.log(
    '+++++++++++++ Donation Processing ',
    donationContribution,
    plantProjectId
  );
  let route = loggedIn ? 'giftDonationContribution_post' : 'giftDonate_post';
  let request = loggedIn
    ? postAuthenticatedRequest(route, donationContribution, {
        plantProject: plantProjectId
      })
    : postRequest(route, donationContribution, {
        plantProject: plantProjectId
      });
  return dispatch => {
    request
      .then(response => {
        const treecounter = response.data;
        debug('success: ', treecounter);
        // a SchemaResponse with a contribution and a treecounter entity should be merged
        // the response will also include the donationUid, required to redirect to the success page
        const [contribution] = treecounter.contributions.splice(-1);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));

        console.log(`Thank you for planting ${
          contribution.treeCount
        } trees with us!
          Your donation has been registered as: ${contribution.uid}
          You will receive an email with a donation receipt in time.
          Green Button: "Return to Profile"`);
      })
      .catch(response => {
        debug('error: ', response);
      });
  };
}
