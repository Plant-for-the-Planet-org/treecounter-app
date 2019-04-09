import {
  deleteAuthenticatedRequest,
  getAuthenticatedRequest,
  getRequest,
  postAuthenticatedRequest,
  putAuthenticatedRequest
} from '../utils/api';
import { setCompetitionDetail } from '../reducers/competitionDetailReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import { deleteEntity, mergeEntities } from '../reducers/entitiesReducer';
import {
  competitionEnrollmentSchema,
  competitionPagerSchema,
  competitionSchema,
  treecounterSchema
} from '../schemas';
import { normalize } from 'normalizr';
import { debug } from '../debug';
import { NotificationManager } from 'react-notifications';
import { updateRoute } from '../helpers/routerHelper';

export function fetchCompetitions(category) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getAuthenticatedRequest('competitions_get', {
      category: category,
      limit: 100
    })
      .then(res => {
        dispatch(
          mergeEntities(
            normalize(
              res.data.merge.competitionPager[0],
              competitionPagerSchema
            )
          )
        );
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}

export function confirmPart(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let data = {
      status: 'enrolled'
    };
    putAuthenticatedRequest('competitionEnrollment_put', data, {
      token: id
    })
      .then(res => {
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
        if (res.data.merge.treecounter) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.treecounter, treecounterSchema)
            )
          );
        }
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}

export function declinePart(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let data = {
      status: 'declined'
    };
    putAuthenticatedRequest('competitionEnrollment_put', data, {
      token: id
    })
      .then(res => {
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
        if (res.data.merge.treecounter) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.treecounter, treecounterSchema)
            )
          );
        }
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}
export function declineinvite(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    deleteAuthenticatedRequest('competitionEnrollment_delete', null, {
      token: id
    })
      .then(res => {
        dispatch(deleteEntity(res.data.merge.competitionEnrollment));
        if (res.data.merge.competition) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.competition, competitionSchema)
            )
          );
        }
        if (res.data.merge.treecounter) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.treecounter, treecounterSchema)
            )
          );
        }
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
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
    postAuthenticatedRequest('competitionLeave_post', data, {
      version: 'v1.1',
      competition: id
    })
      .then(res => {
        console.log(JSON.stringify(res.data));

        if (res.data.merge.competition) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.competition, competitionSchema)
            )
          );
        }
        dispatch(
          deleteEntity({
            competitionEnrollment: res.data.delete.competitionEnrollment
          })
        );
        dispatch(fetchMineCompetitions());
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}

export function createCompetition(value, navigation) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    postAuthenticatedRequest('competition_post', value)
      .then(res => {
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competition, competitionSchema)
          )
        );
        dispatch(setCompetitionDetail(res.data.merge.competition[0].id));
        updateRoute('app_competition', navigation || dispatch, 1, {
          competition: id
        });
        dispatch(setProgressModelState(true));
      })
      .catch(error => {
        console.log(error);
        debug(error);
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
    postAuthenticatedRequest('competitionEnroll_post', data, {
      version: 'v1.1'
    })
      .then(res => {
        console.log(JSON.stringify(res.data));
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
        if (res.data.merge.treecounter) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.treecounter, treecounterSchema)
            )
          );
        }
        dispatch(fetchMineCompetitions());
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}
export function fetchAllCompetitions() {
  return getAuthenticatedRequest('competitions_get', { category: 'all' });
}
export function fetchMineCompetitions() {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getAuthenticatedRequest('competitionsMine_get')
      .then(res => {
        dispatch(
          mergeEntities(
            normalize(
              res.data.merge.competitionPager[0],
              competitionPagerSchema
            )
          )
        );
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}
export function fetchCompetitionDetail(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    getAuthenticatedRequest('competition_get', { uid: id })
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, competitionSchema)));
        dispatch(setCompetitionDetail(id));
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}
