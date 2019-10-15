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
  treecounterSchema,
  plantProjectSchema
} from '../schemas/index';
import { debug } from '../debug/index';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';

export function editTree(plantContribution, plantId, navigation) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    putAuthenticatedRequest('plantContribution_put', plantContribution, {
      plantContribution: plantId
    })
      .then(res => {
        const { statusText } = res;
        const { contribution, treecounter } = res.data;

        NotificationManager.success(statusText, i18n.t('label.success'), 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        dispatch(setProgressModelState(false));
        updateRoute('app_userHome', navigation || dispatch);
      })
      .catch(error => {
        debug(error.response);
        dispatch(setProgressModelState(false));
        NotificationManager.error(
          error.response.data.message,
          i18n.t('label.error'),
          5000
        );
      });
  };
}

export function deleteContribution(plantContributionId) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      deleteAuthenticatedRequest('plantContribution_delete', {
        plantContribution: plantContributionId
      })
        .then(res => {
          const { statusText } = res;
          const { merge, unlink } = res.data;
          const toBeDeleted = res.data['delete'];
          dispatch(unlinkEntity(unlink));
          dispatch(deleteEntity(toBeDeleted));
          merge &&
            merge.treecounter &&
            dispatch(
              mergeEntities(normalize(merge.treecounter, treecounterSchema))
            );
          merge &&
            merge.plantProject &&
            dispatch(
              mergeEntities(normalize(merge.plantProject, plantProjectSchema))
            );
          NotificationManager.success(
            statusText,
            i18n.t('label.success'),
            5000
          );
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
