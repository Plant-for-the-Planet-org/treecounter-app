import { createAction, handleActions } from 'redux-actions';

export const userFeedsSynced = createAction('USER_FEED_SYNCED');
export const getUserFeeds = state => state.userFeeds;

export const initialState = null;

const userFeedReducer = handleActions(
  {
    [userFeedsSynced]: (state, action) => action.payload
  },
  initialState
);

export default userFeedReducer;
