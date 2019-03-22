import { getRequest } from '../utils/api';
import { setCompetitions } from '../reducers/competitionReducer';

export function fetchCompetitions(category) {
  return dispatch => {
    getRequest('competitions_get', { category: category }).then(res => {
      dispatch(setCompetitions(res.data));
    });
  };
}
