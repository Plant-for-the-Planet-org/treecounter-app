import {
  getRequest,
  putAuthenticatedRequest,
  deleteAuthenticatedRequest,
  postAuthenticatedRequest
} from '../utils/api';
import { debug } from '../debug';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { reviewsSchema, plantProjectSchema } from '../schemas/index';
import { normalize } from 'normalizr';
import {
  deleteEntity,
  unlinkEntity,
  mergeEntities
} from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';
// import { ScrollView } from 'react-native-gesture-handler';

export function getReviewIndexes() {
  return getRequest('review_indexes_get', { translated: 1 });
}
export function addReview(review) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve) {
      debug('review:', review, review.id);

      postAuthenticatedRequest('review_post', review)
        .then(res => {
          debug(res.status);
          debug(res);
          let { review, plantProject } = res.data.merge;
          debug(review);
          debug('Normalize:', normalize(review, [reviewsSchema]));
          dispatch(mergeEntities(normalize(review, [reviewsSchema])));
          // TODO: we need to fix to add entry to plant project and userprofile
          // let reviews = [...plantProject.reviews];
          // debug('pmatProject:', plantProject);
          // plantProject.reviews = [reviews, review];
          // debug('pmatProject:', normalize(plantProject, [plantProjectSchema]));
          dispatch(
            mergeEntities(normalize(plantProject, [plantProjectSchema]))
          );
          NotificationManager.success(
            i18n.t('label.new_review_added_successfully'),
            i18n.t('label.congrats'),
            5000
          );
          resolve(review);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, i18n.t('label.error'), 5000);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function deleteReview(reviewId) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      debug('delete review ', reviewId);
      deleteAuthenticatedRequest('review_delete', {
        review: reviewId
      })
        .then(res => {
          debug(res.data);
          const { review } = res.data.delete;
          try {
            dispatch(deleteEntity({ reviews: review }));
            let { unlink } = res.data;
            if (unlink) {
              dispatch(unlinkEntity(unlink));
            }
            let { plantProject } = res.data.merge;

            dispatch(
              mergeEntities(normalize(plantProject, [plantProjectSchema]))
            );
          } catch (err) {
            console.error(err);
          }

          NotificationManager.success(
            i18n.t('label.review_deleted_successfully'),
            i18n.t('label.congrats'),
            5000
          );
          resolve(review);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, i18n.t('label.error'), 5000);
          reject(err);
          dispatch(setProgressModelState(false));
        });
    });
  };
}

export function updateReview(review) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      let reviewId = review.id;
      delete review.id;
      debug('putting', review);

      putAuthenticatedRequest('review_put', review, {
        review: reviewId
      })
        .then(res => {
          debug('updated reviews:', res.data);
          let { review, plantProject } = res.data.merge;
          try {
            dispatch(mergeEntities(normalize(review, [reviewsSchema])));
            dispatch(
              mergeEntities(normalize(plantProject, [plantProjectSchema]))
            );
            let { unlink, delete: deleteContent } = res.data;
            if (unlink && deleteContent) {
              // TODO: we need to fix this error and enable this
              // this will delete entry from reviews and unlink from project and userprofile if there is params in response
              dispatch(unlinkEntity(unlink));
              // dispatch(deleteEntity(deleteContent));
            }
          } catch (err) {
            console.error(err);
          }
          NotificationManager.success(
            i18n.t('label.review_updated_successfully'),
            i18n.t('label.congrats'),
            5000
          );
          resolve(res.data);
          dispatch(setProgressModelState(false));
        })
        .catch(err => {
          debug(err);
          NotificationManager.error(err.message, i18n.t('label.error'), 5000);
          reject(err);
          dispatch(setProgressModelState(false));
        });
    });
  };
}
