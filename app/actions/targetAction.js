import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';

import { debug } from '../debug/index';
import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { getLocalRoute } from './apiRouting';
import { putAuthenticatedRequest } from '../utils/api';

export function SubmitTarget(treecounterData, treecounterId) {
  return dispatch => {
    putAuthenticatedRequest('target_put', treecounterData, {
      treecounter: treecounterId
    })
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
        history.push(getLocalRoute('app_userHome'));
      })
      .catch(error => {
        debug(error);
        NotificationManager.error(
          error.response.data.message,
          error.response.data.code,
          5000
        );
      });
  };
}
