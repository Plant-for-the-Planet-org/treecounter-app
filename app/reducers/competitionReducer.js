import { createAction, handleActions } from 'redux-actions';

export const setCompetitions = createAction('SET_COMPETITIONS');
export const getCompetitions = state => state.competitions;

export const initialState = {
  competitions: null
};

const competitionReducers = handleActions(
  {
    [setCompetitions]: (state, action) => ({
      competitions: action.payload.merge.competitionPager[0].competitions
    })
  },
  initialState
);

export default competitionReducers;
