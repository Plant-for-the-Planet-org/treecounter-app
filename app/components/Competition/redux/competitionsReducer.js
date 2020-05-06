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

const initialState = {
  allCompetitions: [],
  featuredCompetitions: [],
  archivedCompetitions: [],
  mineCompetitions: [],
  currentAllCompetitions: [],
  currentFeaturedCompetitions: [],
  currentArchivedCompetitions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPETITIONS:
      return {
        ...state,
        allCompetitions: action.payload
      };
    case GET_FEATURED_COMPETITIONS:
      return {
        ...state,
        featuredCompetitions: action.payload
      };
    case GET_ARCHIVED_COMPETITIONS:
      return {
        ...state,
        archivedCompetitions: action.payload
      };
    case GET_MINE_COMPETITIONS:
      return {
        ...state,
        mineCompetitions: action.payload
      };
    case SET_CURRENT_ALL_COMPETITIONS:
      return {
        ...state,
        currentAllCompetitions: action.payload
      };
    case SET_CURRENT_FEATURED_COMPETITIONS:
      return {
        ...state,
        currentFeaturedCompetitions: action.payload
      };
    case SET_CURRENT_ARCHIVED_COMPETITIONS:
      return {
        ...state,
        currentArchivedCompetitions: action.payload
      };
    case CLEAR_CURRENT_ALL_COMPETITIONS:
      return {
        ...state,
        currentAllCompetitions: []
      };
    case CLEAR_CURRENT_FEATURED_COMPETITIONS:
      return {
        ...state,
        currentFeaturedCompetitions: []
      };
    case CLEAR_CURRENT_ARCHIVED_COMPETITIONS:
      return {
        ...state,
        currentArchivedCompetitions: []
      };
    default:
      return state;
  }
}
