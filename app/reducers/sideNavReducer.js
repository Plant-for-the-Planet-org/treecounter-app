import {createAction, handleActions} from 'redux-actions';

export const openSideNav = createAction ('OPEN_SIDE_NAV');
export const closeSideNav = createAction ('CLOSE_SIDE_NAV');
export const toggleSideNav = createAction ('TOGGLE_SIDE_NAV');

export const initialState = {
  open: false,
};

const sideNavReducer = handleActions (
  {
    [openSideNav]: state => ({
      ...state,
      open: true,
    }),
    [closeSideNav]: state => ({
      ...state,
      open: false,
    }),
    [toggleSideNav]: state => ({
      ...state,
      open: !state.open,
    }),
  },
  initialState
);

export default sideNavReducer;
