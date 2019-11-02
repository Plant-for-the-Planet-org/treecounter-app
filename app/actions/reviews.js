import {
  putAuthenticatedRequest,
  deleteAuthenticatedRequest,
  postAuthenticatedRequest
} from '../utils/api';
import { debug } from '../debug/index';
import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import {
  userProfileSchema,
  plantProjectSchema,
  tpoSchema,
  reviewsSchema
} from '../schemas/index';
import { normalize } from 'normalizr';
import {
  deleteEntity,
  unlinkEntity,
  mergeEntities
} from '../reducers/entitiesReducer';
import { setProgressModelState } from '../reducers/modelDialogReducer';
import i18n from '../locales/i18n.js';
// import { ScrollView } from 'react-native-gesture-handler';

export function addReview(review, plantProject) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve) {
      console.log('review:', review, review.id);

      postAuthenticatedRequest('review_post', review)
        .then(res => {
          debug(res.status);
          debug(res);
          let { review } = res.data.merge;
          debug(review);
          console.log('Normalize:', normalize(review, [reviewsSchema]));
          dispatch(mergeEntities(normalize(review, [reviewsSchema])));
          // TODO: we need to fix to add entry to plant project and userprofile
          // let reviews = [...plantProject.reviews];
          // console.log('pmatProject:', plantProject);
          // plantProject.reviews = [reviews, review];
          // console.log('pmatProject:', normalize(plantProject, [plantProjectSchema]));
          // dispatch(
          //   mergeEntities(normalize(plantProject, [plantProjectSchema]))
          // );
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
      console.log('delete review ', reviewId);
      deleteAuthenticatedRequest('review_delete', {
        review: reviewId
      })
        .then(res => {
          console.log(res.data.delete);
          const { review } = res.data.delete;
          try {
            // TODO: we need to fix this error and enable this
            // this will delete entry from reviews and unlink from project and userprofile
            // dispatch(unlinkEntity(res.data.unlink));
            dispatch(deleteEntity({ reviews: review }));
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

export function updateReview(review, plantProject) {
  return dispatch => {
    dispatch(setProgressModelState(true));
    return new Promise(function(resolve, reject) {
      let reviewId = review.id;
      delete review.id;
      console.log('putting', review);

      putAuthenticatedRequest('review_put', review, {
        review: reviewId
      })
        .then(res => {
          let { review } = res.data.merge;
          try {
            dispatch(mergeEntities(normalize(review, [reviewsSchema])));
            let { unlink, delete: deleteContent } = res.data;
            if (unlink && deleteContent) {
              // TODO: we need to fix this error and enable this
              // this will delete entry from reviews and unlink from project and userprofile if there is params in response
              // dispatch(unlinkEntity(unlink));
              // dispatch(deleteEntity(deleteContent));
            }
          } catch (err) {
            console.err(err);
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
