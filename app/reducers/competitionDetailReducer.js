import { createAction, handleActions } from 'redux-actions';

export const setCompetitionDetail = createAction('SET_COMPETITION_DETAIL');
export const getCompetitionDetail = state => state.competitionDetail;

export const initialState = {
  competitionDetail: null
};

const competitionDetailReducer = handleActions(
  {
    [setCompetitionDetail]: (state, action) => ({
      competitionDetail: action.payload
    })
  },
  initialState
);

export default competitionDetailReducer;
