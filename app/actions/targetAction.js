import { normalize } from 'normalizr';

import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { debug } from '../debug/index';
import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { putAuthenticatedRequest } from '../utils/api';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function SubmitTarget(treecounterData, navigation = undefined) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    putAuthenticatedRequest('target_put', treecounterData)
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
        updateRoute('app_userHome', navigation || dispatch);
        dispatch(setProgressModelState(false));
      })
      .catch(error => {
        debug(error);
        dispatch(setProgressModelState(false));
        NotificationManager.error(error.response.data.message, 'Error', 5000);
      });
  };
}
