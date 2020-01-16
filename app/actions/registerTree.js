import { normalize } from 'normalizr';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { postAuthenticatedRequest } from '../utils/api';
import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema, treecounterSchema } from '../schemas';
import { debug } from '../debug';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';

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
        mode: mode
      }
    )
      .then(res => {
        console.log('resp===>', res);
        if (res) {
          console.log('response==>', res);

          const { statusText } = res;
          const { contribution, treecounter } = res.data;

          dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
          dispatch(mergeEntities(normalize(contribution, contributionSchema)));
          dispatch(setProgressModelState(false));
          updateRoute('app_userHome', navigation || dispatch);
          NotificationManager.success(
            statusText,
            i18n.t('label.success'),
            5000
          );
          return res;
        }
      })
      .catch(error => {
        debug(error.response);
        console.log('Error in response', error);
        dispatch(setProgressModelState(false));
        NotificationManager.error(
          error.response && error.response.data && error.response.data.message,
          i18n.t('label.error'),
          5000
        );
        throw error;
      });
  };
}
