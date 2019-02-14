import { postAuthenticatedRequest } from '../utils/api';

import { setProgressModelState } from '../reducers/modelDialogReducer';

export function challenge(challengeDetails) {
  let route = 'challenge_post';

  return dispatch => {
    dispatch(setProgressModelState(true));
    let request = postAuthenticatedRequest(route, challengeDetails);
    request
      .then(response => {
        dispatch(setProgressModelState(false));
      })
      .catch(response => {
        debug('error: ', response);
        dispatch(setProgressModelState(false));
      });
  };
}
