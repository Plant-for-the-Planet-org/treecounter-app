import { normalize } from 'normalizr';
import { debug } from '../debug/index';
import { postAuthenticatedRequest } from '../utils/api';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';

export function donate(donationContribution, plantProjectId) {
  console.log(
    '+++++++++++++ Donation Processing ',
    donationContribution,
    plantProjectId
  );
  return dispatch => {
    postAuthenticatedRequest(
      'donationContribution_post',
      donationContribution,
      {
        plantProject: plantProjectId
      }
    )
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
