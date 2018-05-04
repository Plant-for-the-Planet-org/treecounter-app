import axios from 'axios';
import { normalize } from 'normalizr';
import { NotificationManager } from 'react-notifications';

import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';
import { history } from '../components/Common/BrowserRouter';
import { mergeEntities } from '../reducers/entitiesReducer';
import { treecounterSchema } from '../schemas/index';
import { getLocalRoute } from './apiRouting';

export function SubmitTarget(treecounter, treecounterId) {
  return dispatch => {
    const data = {
      countTarget: treecounter.countTarget,
      targetYear: treecounter.targetYear,
      targetComment: treecounter.targetComment
    };
    axios
      .put(getApiRoute('target_put', { treecounter: treecounterId }), data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      })
      .then(res => {
        const treecounterData = res.data;
        // make sure key 'targetComment' is present in merge data even it has not been returned in response
        treecounterData.target_comment =
          'target_comment' in treecounterData
            ? treecounterData.target_comment
            : null;
        dispatch(mergeEntities(normalize(treecounterData, treecounterSchema)));
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
