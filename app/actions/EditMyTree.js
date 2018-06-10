import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';
import { putAuthenticatedRequest } from '../utils/api';

import { updateRoute } from '../helpers/routerHelper';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { debug } from '../debug/index';

export function editTree(plantContribution, plantId) {
  return dispatch => {
    putAuthenticatedRequest('plantContribution_put', plantContribution, {
      plantContribution: plantId
    })
      .then(res => {
        debug(res, res.response);
        const { data: treecounter, statusText, status } = res;
        NotificationManager.success(statusText, status, 5000);
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)));
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
