import {
  openSideNav,
  closeSideNav,
  toggleSideNav
} from '../reducers/sideNavReducer';

function openSideNavAction() {
  return dispatch => {
    dispatch(openSideNav());
  };
}

function closeSideNavAction() {
  return dispatch => {
    dispatch(closeSideNav());
  };
}

function toggleSideNavAction() {
  return dispatch => {
    dispatch(toggleSideNav());
  };
}

export { openSideNavAction, closeSideNavAction, toggleSideNavAction };
