import isEqual from 'lodash/isEqual';
import { createAction, handleActions } from 'redux-actions';
export const setCdnMedia = createAction('CDNMEDIA_SET');
export const getCdnMedia = state => state.cdnMedia;

export const initialState = {
  cdnMedia: {}
};

const configReducer = handleActions(
  {
    [setCdnMedia]: (state, action) => ({
      cdnMedia: isEqual(state.cdnMedia, action.payload)
        ? state.cdnMedia
        : action.payload
    })
  },
  initialState
);

export default configReducer;
