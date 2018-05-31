import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';
import { postAuthenticatedRequest } from '../utils/api';

import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { getLocalRoute } from './apiRouting';
import { debug } from '../debug/index';

export function registerTree(plantContribution, treecounterId, mode) {
  return dispatch => {
    postAuthenticatedRequest('plantContribution_post', plantContribution, {
      treecounter: treecounterId,
      mode: mode
    })
      .then(res => {
        debug(res, res.response);
        const { data: treecounter, statusText, status } = res;
        NotificationManager.success(statusText, status, 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
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
