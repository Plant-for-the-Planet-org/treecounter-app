import { normalize } from 'normalizr';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { postAuthenticatedRequest } from '../utils/api';

import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema, treecounterSchema } from '../schemas/index';
import { debug } from '../debug/index';

export function registerTree(
  plantContribution,
  treecounterId,
  mode,
  navigation
) {
  return dispatch => {
    postAuthenticatedRequest('plantContribution_post', plantContribution, {
      treecounter: treecounterId,
      mode: mode
    })
      .then(res => {
        const { statusText } = res;
        const { contribution, treecounter } = res.data;

        NotificationManager.success(statusText, 'Success', 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        updateRoute('app_userHome', navigation || dispatch);
      })
      .catch(error => {
        debug(error.response);
        NotificationManager.error(error.response.data.message, 'Error', 5000);
      });
  };
}
