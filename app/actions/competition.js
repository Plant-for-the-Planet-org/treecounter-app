import { getAuthenticatedRequest, getRequest } from '../utils/api';
import { setCompetitions } from '../reducers/competitionReducer';
import { setCompetitionDetail } from '../reducers/competitionDetailReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { mergeEntities } from '../reducers/entitiesReducer';
import { competitionPagerSchema } from '../schemas';
import { normalize } from 'normalizr';

export function fetchCompetitions(category) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getAuthenticatedRequest('competitions_get', {
      category: category,
      limit: 100
    }).then(res => {
      dispatch(
        mergeEntities(
          normalize(res.data.merge.competitionPager[0], competitionPagerSchema)
        )
      );
      dispatch(setProgressModelState(false));
    });
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
