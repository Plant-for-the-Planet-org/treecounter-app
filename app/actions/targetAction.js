import axios from 'axios';
import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';

import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';
import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { getLocalRoute } from './apiRouting';
import { fetchItem } from '../stores/localStorage';

export function SubmitTarget(treecounter, treecounterId) {
  return dispatch => {
    const data = {
      countTarget: treecounter.countTarget,
      targetYear: treecounter.targetYear,
      targetComment: treecounter.targetComment
    };
    axios
      .put(getApiRoute('target_put', { treecounter: treecounterId }), data, {
        headers: {
          Authorization: `Bearer ${fetchItem('jwt')}`
        }
      })
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, treecounterSchema)));
        history.push(getLocalRoute('app_userHome'));
      })
      .catch(error => {
        debug(error);
        NotificationManager.error(
          error.response.data.message,
          error.response.data.code,
          5000
        );
      });
  };
}
