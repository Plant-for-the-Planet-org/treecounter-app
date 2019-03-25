import {
  getAuthenticatedRequest,
  getRequest,
  postAuthenticatedRequest
} from '../utils/api';
import { setCompetitionDetail } from '../reducers/competitionDetailReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { mergeEntities } from '../reducers/entitiesReducer';
import {
  competitionEnrollmentSchema,
  competitionPagerSchema,
  competitionSchema
} from '../schemas';
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

export function leaveCompetition(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let data = {
      competition: id
    };
    postAuthenticatedRequest('competitionLeave_post', data).then(res => {
      dispatch(
        mergeEntities(
          normalize(
            res.data.merge.competitionEnrollment,
            competitionEnrollmentSchema
          )
        )
      );
      if (res.data.merge.competition) {
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competition, competitionSchema)
          )
        );
      }
      dispatch(setProgressModelState(false));
    });
  };
}
export function enrollCompetition(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let data = {
      competition: id
    };
    postAuthenticatedRequest('competitionEnroll_post', data).then(res => {
      dispatch(
        mergeEntities(
          normalize(
            res.data.merge.competitionEnrollment,
            competitionEnrollmentSchema
          )
        )
      );
      if (res.data.merge.competition) {
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competition, competitionSchema)
          )
        );
      }
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
