import { normalize } from 'normalizr';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { postAuthenticatedRequest } from '../utils/api';
import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import {
  contributionSchema,
  // competitionEnrollmentSchema,
  // competitionSchema,
  treecounterSchema,
  plantProjectSchema
} from '../schemas';
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
        version: 'v1.3',
        mode: mode
      }
    )
      .then(res => {
        console.log('resp===>', res);
        if (res) {
          console.log('response==>', res);

          const { statusText } = res;
          const { merge } = res.data;
          if (merge) {
            merge.contribution &&
              dispatch(
                mergeEntities(
                  normalize(merge.contribution[0], contributionSchema)
                )
              );
            merge.treecounter &&
              dispatch(
                mergeEntities(
                  normalize(merge.treecounter[0], treecounterSchema)
                )
              );
            merge.plantProject &&
              dispatch(
                mergeEntities(
                  normalize(merge.plantProject[0], plantProjectSchema)
                )
              );
            // TODO: how to interpret these data in the response?
            // merge.competitionEnrollment &&
            // dispatch(
            //   mergeEntities(normalize(merge.competitionEnrollment[0], [ competitionEnrollmentSchema]))
            // );
            // merge.competition &&
            // dispatch(
            //   mergeEntities(normalize(merge.competition[0], [competitionSchema]))
            // );
          }
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
      })
      .finally(() => {
        dispatch(setProgressModelState(false));
      });
  };
}
