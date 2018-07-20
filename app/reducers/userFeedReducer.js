import { createAction, handleActions } from 'redux-actions';

export const userFeedsSynced = createAction('USER_FEED_SYNCED');
export const userFeedsSyncedMore = createAction('USER_FEED_SYNCED_MORE');
export const userFeedsSyncedMarkRead = createAction(
  'USER_FEED_SYNCED_MARK_READ'
);

export const getUserFeeds = state => state.userFeeds;

export const initialState = null;

const userFeedReducer = handleActions(
  {
    [userFeedsSynced]: (state, action) => action.payload,
    [userFeedsSyncedMore]: (state, action) => {
      let temp = state;
      temp.userFeeds.concat(action.payload.userFeeds);
      temp.more = action.payload.more;
      temp.unRead = action.payload.unRead;
      return temp;
    },
    [userFeedsSyncedMarkRead]: (state, action) => {
      return { ...state, unRead: action.payload.unRead };
    }
  },
  initialState
);

export default userFeedReducer;
