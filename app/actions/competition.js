import { getRequest } from '../utils/api';
import { setCompetitions } from '../reducers/competitionReducer';
import { setCompetitionDetail } from '../reducers/competitionDetailReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';

export function fetchCompetitions(category) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getRequest('competitions_get', { category: category }).then(res => {
      dispatch(setCompetitions(res.data));
      dispatch(setProgressModelState(false));
    });
  };
}

export function fetchCompetitionDetail(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getRequest('competition_get', { uid: id }).then(res => {
      dispatch(setCompetitionDetail(res.data));
      dispatch(setProgressModelState(false));
    });
  };
}
