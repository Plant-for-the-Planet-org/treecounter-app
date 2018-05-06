import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import * as ROUTES from '../constants/routes';
import { debug } from '../debug/index';

export function Payment(paymentInfo, plantProjectId) {
  axios({
    method: ROUTES.postDonationContributionForm.method,
    url: getApiRoute(ROUTES.postDonationContributionForm.name, {
      plantProject: plantProjectId
    }),
    data: paymentInfo,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
    }
  })
    .then(({ data }) => {
      debug(`Not the case ${data}`);
    })
    .catch(({ response }) => {
      debug(`Pushing to new URL- ${response.data}`);
      window.location.href = response.data;
    });
}
