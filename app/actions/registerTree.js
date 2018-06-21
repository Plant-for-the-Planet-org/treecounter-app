import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';
import { postAuthenticatedRequest } from '../utils/api';

import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema, treecounterSchema } from '../schemas/index';
import { getLocalRoute } from './apiRouting';
import { debug } from '../debug/index';

export function registerTree(plantContribution, treecounterId, mode) {
  return dispatch => {
    postAuthenticatedRequest('plantContribution_post', plantContribution, {
      treecounter: treecounterId,
      mode: mode
    })
      .then(res => {
        const { statusText, status } = res;
        const { contribution, treecounter } = res.data;

        NotificationManager.success(statusText, status, 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        history.push(getLocalRoute('app_userHome'));
      })
      .catch(error => {
        debug(error.response);
        NotificationManager.error(
          error.response.data.message,
          error.response.data.code,
          5000
        );
      });
  };
}
