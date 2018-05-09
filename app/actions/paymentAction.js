import { debug } from '../debug/index';
import { postAuthenticatedRequest } from '../utils/api';

export function Payment(paymentInfo, plantProjectId) {
  postAuthenticatedRequest('donationContribution_post', paymentInfo, {
    plantProject: plantProjectId
  })
    .then(({ data }) => {
      debug(`Not the case ${data}`);
    })
    .catch(({ response }) => {
      debug(`Pushing to new URL- ${response.data}`);
      window.location.href = response.data;
    });
}
