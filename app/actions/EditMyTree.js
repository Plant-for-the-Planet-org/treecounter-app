import { normalize } from 'normalizr';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import {
  putAuthenticatedRequest,
  deleteAuthenticatedRequest
} from '../utils/api';

import { updateRoute } from '../helpers/routerHelper';
import { deleteEntity, mergeEntities } from '../reducers/entitiesReducer';
import {
  contributionSchema,
  treecounterSchema,
  userProfileSchema
} from '../schemas/index';
import { debug } from '../debug/index';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function editTree(plantContribution, plantId, navigation) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    putAuthenticatedRequest('plantContribution_put', plantContribution, {
      plantContribution: plantId
    })
      .then(res => {
        const { statusText } = res;
        const { contribution, treecounter } = res.data;

        NotificationManager.success(statusText, 'Success', 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        dispatch(setProgressModelState(false));
        updateRoute('app_myTrees', navigation || dispatch);
      })
      .catch(error => {
        debug(error.response);
        dispatch(setProgressModelState(false));
        NotificationManager.error(error.response.data.message, 'Error', 5000);
      });
  };
}

export function deleteContribution(plantContributionId) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      deleteAuthenticatedRequest('plantContribution_delete', {
        plantContribution: plantContributionId
      })
        .then(res => {
          const { treecounter } = res.data;
          dispatch(
            deleteEntity({
              contribution: [plantContributionId]
            })
          );
          dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
          resolve(treecounter);
        })
        .catch(err => {
          debug(err);
          reject(err);
        });
    });
  };
}
