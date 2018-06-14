import { debug } from '../debug/index';
import { postAuthenticatedRequest } from '../utils/api';

export function donate(donationContribution, plantProjectId) {
  return dispatch => {
    postAuthenticatedRequest(
      'donationContribution_post',
      donationContribution,
      {
        plantProject: plantProjectId
      }
    )
      .then(({ data }) => {
        debug(`Not the case ${data}`);
        // a SchemaResponse with a contribution and a treecounter entity should be merged
        // the reponse will also include the donationUid, required to redirect to the success page
        dispatch(mergeEntities(normalize(res.data, contribution)));
      })
      .catch(({ response }) => {
        debug(`Pushing to new URL- ${response.data}`);
        //window.location.href = response.data;
      });
  };
}
