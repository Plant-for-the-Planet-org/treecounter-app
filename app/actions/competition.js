import {
  deleteAuthenticatedRequest,
  getAuthenticatedRequest,
  getRequest,
  postAuthenticatedRequest,
  putAuthenticatedRequest
} from '../utils/api';
import { setCompetitionDetail } from '../reducers/competitionDetailReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import {
  deleteEntity,
  mergeEntities,
  unlinkEntity
} from '../reducers/entitiesReducer';
import {
  competitionEnrollmentSchema,
  competitionPagerSchema,
  competitionSchema,
  treecounterSchema
} from '../schemas';
import { normalize } from 'normalizr';
import { debug } from '../debug';
import { updateRoute } from '../helpers/routerHelper';
import { NotificationManager } from 'react-notifications';

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
    putAuthenticatedRequest('competitionEnrollment_accept', null, {
      token: id
    })
      .then(res => {
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competitionEnrollment, [
              competitionEnrollmentSchema
            ])
          )
        );
        if (res.data.merge.competition) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.competition, [competitionSchema])
            )
          );
        }
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setProgressModelState(false));
      });
  };
}

export function declinePart(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    putAuthenticatedRequest('competitionEnrollment_decline', null, {
      token: id
    })
      .then(res => {
        dispatch(unlinkEntity(res.data.unlink));
        dispatch(deleteEntity(res.data.delete));
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}
export function cancelInvite(id) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    deleteAuthenticatedRequest('competitionEnrollment_delete', {
      token: id
    })
      .then(res => {
        dispatch(unlinkEntity(res.data.unlink));
        dispatch(deleteEntity(res.data.delete));
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        console.log(err);
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
        if (res.data.merge) {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.competition, [competitionSchema])
            )
          );
        }
        dispatch(unlinkEntity(res.data.unlink));
        dispatch(deleteEntity(res.data.delete));
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
            normalize(res.data.merge.competition, [competitionSchema])
          )
        );
        dispatch(
          mergeEntities(
            normalize(res.data.merge.treecounter, [treecounterSchema])
          )
        );
        updateRoute('app_competition', navigation || dispatch, 1, {
          competition: res.data.merge.competition[0].id
        });

        dispatch(setProgressModelState(false));
        NotificationManager.success(
          'Competition Created successfully',
          'Success',
          5000
        );
        dispatch(fetchMineCompetitions());
      })
      .catch(error => {
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
        dispatch(
          mergeEntities(
            normalize(res.data.merge.treecounter, [treecounterSchema])
          )
        );
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competition, [competitionSchema])
          )
        );
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competitionEnrollment, [
              competitionEnrollmentSchema
            ])
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

export function invitePart(competition, competitor) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    let data = {
      competition: competition,
      competitor: competitor
    };
    postAuthenticatedRequest('competitionInvitation_post', data)
      .then(res => {
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competition, [competitionSchema])
          )
        );
        dispatch(
          mergeEntities(
            normalize(res.data.merge.competitionEnrollment, [
              competitionEnrollmentSchema
            ])
          )
        );
        dispatch(setProgressModelState(false));
      })
      .catch(err => {
        console.log(err);
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
