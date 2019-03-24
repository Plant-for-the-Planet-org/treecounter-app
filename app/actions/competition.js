import { getAuthenticatedRequest, getRequest } from '../utils/api';
import { setCompetitions } from '../reducers/competitionReducer';
import { setCompetitionDetail } from '../reducers/competitionDetailReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function fetchCompetitions(category) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getAuthenticatedRequest('competitions_get', { category: category }).then(
      res => {
        dispatch(setCompetitions(res.data));
        dispatch(setProgressModelState(false));
      }
    );
  };
}

export function fetchAllCompetitions() {
  return getAuthenticatedRequest('competitions_get', { category: 'all' });
}
export function fetchMineCompetitions() {
  return getAuthenticatedRequest('competitionsMine_get');
}
export function fetchCompetitionDetail(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getAuthenticatedRequest('competition_get', { uid: id }).then(res => {
      dispatch(setCompetitionDetail(res.data));
      dispatch(setProgressModelState(false));
    });
  };
}
