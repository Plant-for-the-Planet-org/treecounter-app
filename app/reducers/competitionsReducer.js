import {
  GET_ALL_COMPETITIONS,
  GET_FEATURED_COMPETITIONS,
  GET_ARCHIVED_COMPETITIONS
} from '../actions/types';

const initialState = {
  allCompetitions: [],
  featuredCompetitions: [],
  archivedCompetitions: []
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
    default:
      return state;
  }
}
