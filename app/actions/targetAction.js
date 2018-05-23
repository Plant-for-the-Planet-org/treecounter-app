import { normalize } from 'normalizr';

import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { debug } from '../debug/index';
import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { putAuthenticatedRequest } from '../utils/api';

export function SubmitTarget(treecounterData) {
  return dispatch => {
    putAuthenticatedRequest('target_put', treecounterData)
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
        updateRoute('app_userHome', dispatch);
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
