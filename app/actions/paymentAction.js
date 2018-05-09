import axios from 'axios';

import { getApiRoute } from '../actions/apiRouting';
import * as ROUTES from '../constants/routes';
import { debug } from '../debug/index';
import { fetchItem } from '../stores/localStorage';

export function Payment(paymentInfo, plantProjectId) {
  axios({
    method: 'POST',
    url: getApiRoute('donationContribution_post', {
      plantProject: plantProjectId
    }),
    data: paymentInfo,
    headers: {
      Authorization: `Bearer ${fetchItem('jwt')}`
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
