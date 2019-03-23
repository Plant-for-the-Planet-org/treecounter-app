import { createAction, handleActions } from 'redux-actions';

export const setCompetitions = createAction('SET_COMPETITIONS');
export const setCompetitionDetail = createAction('SET_COMPETITION_DETAIL');
export const getCompetitions = state => state.competitions;
export const getCompetitionDetail = state => state.competitionDetail;

export const initialState = {
  competitions: null,
  competitionDetail: null
};

const competitionReducers = handleActions(
  {
    [setCompetitions]: (state, action) => ({
      competitions: action.payload.merge.competitionPager[0].competitions
    }),
    [setCompetitionDetail]: (state, action) => ({
      competitionDetail: action.payload
    })
  },
  initialState
);

export default competitionReducers;
