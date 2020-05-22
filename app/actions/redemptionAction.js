import { postAuthenticatedRequest } from '../utils/api';
import { loadUserProfile } from './loadUserProfileAction';

export function validateCodeAction(data, params) {
  return postAuthenticatedRequest('validateCode_post', data, params);
}

export function setRedemptionCodeAction(data, params) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      postAuthenticatedRequest('convertCode_post', data, params)
        .then((res) => {
          // The resulting objects of this API cannot be merged into the state of the app,
          // therefore the only solution to update the gifts is to reload the treecounter
          // with the user profile.
          dispatch(
            loadUserProfile(null)
          );
          resolve(res);
        }, (err) => {
          reject(err)
        });
    })
  }
}
