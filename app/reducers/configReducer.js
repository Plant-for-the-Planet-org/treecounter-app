import isEqual from 'lodash/isEqual';
import { createAction, handleActions } from 'redux-actions';

export const setCdnMedia = createAction('CDNMEDIA_SET');
export const getCdnMedia = state => state.cdnMedia;
export const setWebMapIdList = createAction('WEBMAPIDS_SET');
export const getWebMapIdList = state => state.webMapIds;

export const initialState = {
  cdnMedia: {},
  webMapIds: {}
};

const configReducer = handleActions(
  {
    [setCdnMedia]: (state, action) => ({
      cdnMedia: isEqual(state.cdnMedia, action.payload)
        ? state.cdnMedia
        : action.payload
    }),
    [setWebMapIdList]: (state, action) => ({
      webMapIds: isEqual(state.webMapIds, action.payload)
        ? state.webMapIds
        : action.payload
    })
  },
  initialState
);

export default configReducer;
