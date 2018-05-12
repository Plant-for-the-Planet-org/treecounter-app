import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';
import { postAuthenticatedRequest } from '../utils/api';

import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema } from '../schemas/index';
import { getLocalRoute } from './apiRouting';
import { debug } from '../debug/index';

export function registerTree(plantContribution, treecounterId) {
  return dispatch => {
    postAuthenticatedRequest('plantContribution_post', plantContribution, {
      treecounter: treecounterId
    })
      .then(res => {
        debug(res, res.response);
        const { data: contribution, statusText, status } = res;
        NotificationManager.success(statusText, status, 5000);
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
