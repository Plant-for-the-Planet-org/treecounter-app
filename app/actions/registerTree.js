import { normalize } from 'normalizr';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { postAuthenticatedRequest } from '../utils/api';

import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema, treecounterSchema } from '../schemas';
import { debug } from '../debug';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function registerTree(
  plantContribution,
  treecounterId,
  mode,
  navigation
) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return postAuthenticatedRequest(
      'plantContribution_post',
      plantContribution,
      {
        treecounter: treecounterId,
        mode: mode
      }
    )
      .then(res => {
        const { statusText } = res;
        const { contribution, treecounter } = res.data;

        NotificationManager.success(statusText, 'Success', 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        dispatch(setProgressModelState(false));
        updateRoute('app_userHome', navigation || dispatch);
        return true;
      })
      .catch(error => {
        debug(error.response);
        dispatch(setProgressModelState(false));
        NotificationManager.error(error.response.data.message, 'Error', 5000);
        throw error;
      });
  };
}
