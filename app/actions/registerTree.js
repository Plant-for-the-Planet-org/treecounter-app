import axios from 'axios';
import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';

import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { contributionSchema } from '../schemas/index';
import { getLocalRoute, getApiRoute } from './apiRouting';
import { debug } from '../debug/index';
import { fetchItem } from '../stores/localStorage';

export function registerTree(plantContribution, treecounterId) {
  return dispatch => {
    axios
      .post(
        getApiRoute('plantContribution_post', { treecounter: treecounterId }),
        plantContribution,
        {
          headers: {
            Authorization: `Bearer ${fetchItem('jwt')}`
          }
        }
      )
      .then(res => {
        debug(res, res.response);
        const { data: contribution, statusText, status } = res;
        NotificationManager.success(statusText, status, 5000);
        dispatch(mergeEntities(normalize(contribution, contributionSchema)));
        history.push(getLocalRoute('app_userHome'));
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
