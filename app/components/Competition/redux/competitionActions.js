import {
  deleteAuthenticatedRequest,
  getAuthenticatedRequest,
  postAuthenticatedRequest,
  putAuthenticatedRequest
} from '../../../utils/api';
import { setCompetitionDetail } from './competitionDetailReducer';
import { setProgressModelState } from '../../../reducers/modelDialogReducer';
import { setContentLoaderState } from '../../../reducers/contentloaderReducer';

import {
  deleteEntity,
  mergeEntities,
  unlinkEntity
} from '../../../reducers/entitiesReducer';
import {
  competitionEnrollmentSchema,
  competitionSchema,
  treecounterSchema
} from '../../../schemas';
import { normalize } from 'normalizr';
import { debug } from '../../../debug';
import { updateRoute } from '../../../helpers/routerHelper';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';
import i18n from '../../../locales/i18n.js';

// importing action type
import {
  GET_ALL_COMPETITIONS,
  GET_FEATURED_COMPETITIONS,
  GET_ARCHIVED_COMPETITIONS,
  GET_MINE_COMPETITIONS,
  SET_CURRENT_ALL_COMPETITIONS,
  SET_CURRENT_FEATURED_COMPETITIONS,
  SET_CURRENT_ARCHIVED_COMPETITIONS,
  CLEAR_CURRENT_ALL_COMPETITIONS,
  CLEAR_CURRENT_FEATURED_COMPETITIONS,
  CLEAR_CURRENT_ARCHIVED_COMPETITIONS
} from '../../../actions/types';

export function fetchCompetitions(category, page) {
  let actionType;
  if (category === 'archived') {
    actionType = GET_ARCHIVED_COMPETITIONS;
  } else if (category === 'featured') {
    actionType = GET_FEATURED_COMPETITIONS;
  } else {
    actionType = GET_ALL_COMPETITIONS;
  }
  return dispatch => {
    // dispatch(setContentLoaderState(true));
    return getAuthenticatedRequest('competitions_get', {
      category: category,
      page: page,
      limit: 10
    })
      .then(res => {
        dispatch(
          {
            type: actionType,
            payload: res.data.merge.competitionPager
          }
          // mergeEntities(
          //   normalize(
          //     res.data.merge.competitionPager[0],
          //     competitionPagerSchema
          //   )
          // )
        );
        dispatch(setContentLoaderState(false));
        return res;
      })
      .catch(err => {
        debug(err);
        dispatch(setContentLoaderState(false));
        return err;
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
        debug(err);
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
    return new Promise(function(resolve, reject) {
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
          // updateRoute('app_competition', navigation || dispatch, 1, {
          //   competition: res.data.merge.competition[0].id,
          //   titleParam: res.data.merge.competition[0].name
          // });
          // debug(updateRoute('app_competitions', navigation || dispatch));
          updateRoute('app_competitions', navigation || dispatch);
          resolve(res.data);
          dispatch(setProgressModelState(false));
          NotificationManager.success(
            i18n.t('label.competition_create_successfully'),
            i18n.t('label.success'),
            5000
          );
          dispatch(fetchMineCompetitions());
          dispatch(fetchCompetitions('all'));
          dispatch(fetchCompetitions('featured'));
          dispatch(fetchCompetitions('archived'));
        })
        .catch(error => {
          debug(error);
          NotificationManager.error(
            i18n.t('label.competition_creation_error'),
            i18n.t('label.error'),
            5000
          );
          reject(error);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function editCompetition(value, param, navigation) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      putAuthenticatedRequest('competition_put', value, { competition: param })
        .then(res => {
          dispatch(
            mergeEntities(
              normalize(res.data.merge.competition, [competitionSchema])
            )
          );
          updateRoute('app_competition', navigation || dispatch, 1, {
            competition: res.data.merge.competition[0].id,
            titleParam: res.data.merge.competition[0].name
          });
          resolve(res.data);
          dispatch(setProgressModelState(false));
          NotificationManager.success(
            i18n.t('label.competition_edited_successfully'),
            i18n.t('label.success'),
            5000
          );
          dispatch(fetchMineCompetitions());
        })
        .catch(error => {
          debug(error);
          NotificationManager.error(
            i18n.t('label.competition_editing_error'),
            i18n.t('label.error'),
            5000
          );
          reject(error);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function deleteCompetition(param) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      deleteAuthenticatedRequest('competition_delete', { competition: param })
        .then(res => {
          dispatch(unlinkEntity(res.data.unlink));
          dispatch(deleteEntity(res.data.delete));

          dispatch(setProgressModelState(false));
          NotificationManager.success(
            i18n.t('label.competition_deleted_successfully'),
            i18n.t('label.success'),
            5000
          );
          dispatch(fetchMineCompetitions());
        })
        .catch(error => {
          debug(error);
          NotificationManager.error(
            i18n.t('label.competition_delete_error'),
            i18n.t('label.error'),
            5000
          );
          reject(error);
          dispatch(setProgressModelState(false));
        });
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
    //dispatch(setContentLoaderState(true));
    return getAuthenticatedRequest('competitionsMine_get')
      .then(res => {
        dispatch({
          type: GET_MINE_COMPETITIONS,
          payload: res.data.merge.competitionPager
        });
        dispatch(setContentLoaderState(false));
        return res;
      })
      .catch(err => {
        debug(err);
        dispatch(setContentLoaderState(false));
        return err;
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
        debug(err);
        dispatch(setProgressModelState(false));
      });
  };
}

export function fetchCompetitionDetail(id) {
  return dispatch => {
    // dispatch(setProgressModelState(true));
    dispatch(setContentLoaderState(true));

    getAuthenticatedRequest('competition_get', { uid: id })
      .then(res => {
        dispatch(mergeEntities(normalize(res.data, competitionSchema)));
        dispatch(setCompetitionDetail(id));
        // dispatch(setProgressModelState(false));
        dispatch(setContentLoaderState(false));
      })
      .catch(err => {
        debug(err);
        // dispatch(setProgressModelState(false));
        dispatch(setContentLoaderState(false));
      });
  };
}

export function setCurrentCompetitions(category, competitionsArr) {
  let actionType;
  if (category === 'archived') {
    actionType = SET_CURRENT_ARCHIVED_COMPETITIONS;
  } else if (category === 'featured') {
    actionType = SET_CURRENT_FEATURED_COMPETITIONS;
  } else {
    actionType = SET_CURRENT_ALL_COMPETITIONS;
  }
  return dispatch => {
    dispatch({
      type: actionType,
      payload: competitionsArr
    });
  };
}

export function clearCurrentCompetitions(category) {
  let actionType;
  if (category === 'archived') {
    actionType = CLEAR_CURRENT_ARCHIVED_COMPETITIONS;
  } else if (category === 'featured') {
    actionType = CLEAR_CURRENT_FEATURED_COMPETITIONS;
  } else {
    actionType = CLEAR_CURRENT_ALL_COMPETITIONS;
  }
  return dispatch => {
    dispatch({
      type: actionType
    });
  };
}
