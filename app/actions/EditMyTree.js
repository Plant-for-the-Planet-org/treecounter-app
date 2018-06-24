import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';
import { putAuthenticatedRequest } from '../utils/api';

import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema, treecounterSchema } from '../schemas/index';
import { debug } from '../debug/index';

export function editTree(plantContribution, plantId) {
  return dispatch => {
    putAuthenticatedRequest('plantContribution_put', plantContribution, {
      plantContribution: plantId
    })
      .then(res => {
        const { statusText, status } = res;
        const { contribution, treecounter } = res.data;

        NotificationManager.success(statusText, status, 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        updateRoute('app_myTrees', dispatch);
      })
      .catch(error => {
        debug(error.response);
        NotificationManager.error(
          error.response.data.message,
          error.response.data.code,
          5000
        );
      });
  };
}
