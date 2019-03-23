import { getRequest } from '../utils/api';
import {
  setCompetitions,
  setCompetitionDetail
} from '../reducers/competitionReducer';

export function fetchCompetitions(category) {
  return dispatch => {
    getRequest('competitions_get', { category: category }).then(res => {
      dispatch(setCompetitions(res.data));
    });
  };
}

export function getCompetitionDetail(id) {
  return dispatch => {
    getRequest('competition_get', { uid: id }).then(res => {
      dispatch(setCompetitionDetail(res.data));
    });
  };
}
