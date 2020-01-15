import { normalize } from 'normalizr';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import {
  putAuthenticatedRequest,
  deleteAuthenticatedRequest
} from '../utils/api';

import { updateRoute } from '../helpers/routerHelper';
import {
  deleteEntity,
  mergeEntities,
  unlinkEntity
} from '../reducers/entitiesReducer';
import {
  contributionSchema,
  // competitionEnrollmentSchema,
  // competitionSchema,
  treecounterSchema,
  plantProjectSchema
} from '../schemas';
import { debug } from '../debug/index';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';

export function editTree(plantContribution, plantId, navigation) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    putAuthenticatedRequest('plantContribution_put', plantContribution, {
      version: 'v1.3',
      plantContribution: plantId
    })
      .then(res => {
        const { statusText } = res;
        const { merge } = res.data;
        if (merge) {
          merge.contribution &&
            dispatch(
              mergeEntities(
                normalize(merge.contribution[0], contributionSchema)
              )
            );
        }
        updateRoute('app_userHome', navigation || dispatch);
        NotificationManager.success(statusText, i18n.t('label.success'), 5000);
      })
      .catch(error => {
        debug(error);
        NotificationManager.error(
          error.response.data.message,
          i18n.t('label.error'),
          5000
        );
      })
      .finally(() => {
        dispatch(setProgressModelState(false));
      });
  };
}

export function deleteContribution(plantContributionId, navigation) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      deleteAuthenticatedRequest('plantContribution_delete', {
        version: 'v1.3',
        plantContribution: plantContributionId
      })
        .then(res => {
          const { statusText } = res;
          const { merge, unlink } = res.data;
          const toBeDeleted = res.data['delete'];
          dispatch(unlinkEntity(unlink));
          dispatch(deleteEntity(toBeDeleted));
          if (merge) {
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
          resolve(res.data);
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(
            err.response.data.message,
            i18n.t('label.error'),
            5000
          );
          reject(err);
        })
        .finally(() => {
          dispatch(setProgressModelState(false));
        });
    });
  };
}
