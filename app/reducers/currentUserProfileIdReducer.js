import {createAction, handleActions} from 'redux-actions';

export const setCurrentUserProfileId = createAction('CURRENT_USER_PROFILE_ID_SET');
export const getCurrentUserProfileId = state => state.currentUserProfileId;

export const initialState = null;

const reducer = handleActions({
  CURRENT_USER_PROFILE_ID_SET: (state, action) => action.payload,
}, initialState);

export default reducer;
