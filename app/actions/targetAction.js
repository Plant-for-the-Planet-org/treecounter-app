import { normalize } from 'normalizr';
import { debug } from '../debug/index';
import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { putAuthenticatedRequest } from '../utils/api';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function SubmitTarget(treecounterData, navigation = undefined) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      putAuthenticatedRequest('target_put', treecounterData)
        .then(res => {
          dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
          resolve(res.data);
          updateRoute('app_userHome', navigation || dispatch);
          dispatch(setProgressModelState(false));
        })
        .catch(error => {
          debug(error);
          reject(error);
          dispatch(setProgressModelState(false));
          // NotificationManager.error(error.response.data.message, i18n.t('label.error'), 5000);
        });
    });
  };
}
