import { createAction, handleActions } from 'redux-actions';

export const setUser = createAction('SET_USER');
export const setUserLogIn = createAction('LOG_USER_IN');
export const setUserLogOut = createAction('LOG_USER_OUT');
export const getUser = state => (state ? state.authentication.user : null);

export const initialState = {
  user: null
};

const reducer = handleActions(
  {
    LOG_USER_IN: (state, action) => ({
      user: action.payload.user
    }),

    LOG_USER_OUT: () => ({
      user: null
    })
  },
  initialState
);

export default reducer;
