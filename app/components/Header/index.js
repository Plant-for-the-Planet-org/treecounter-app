import React, { lazy } from 'react';
import PropTypes from 'prop-types';

// Components
const SearchBar = lazy(() => import('./Search'));
const HeaderFields = lazy(() => import('./HeaderFields'));
const BurgerMenu = lazy(() => import('./BurgerMenu'));
const HomeButton = lazy(() => import('./HomeButton'));

const Header = ({
  userFeeds,
  updateRoute,
  logoutUser,
  userProfile,
  fetchMoreNotifications,
  markSeenNotificationAction,
  updateProfileDedication
}) => {
  let isLoggedIn = null != userProfile;
  return (
    <header className="app-header">
      <div className="app-header__home">
        <BurgerMenu />
        {isLoggedIn ? <HomeButton /> : null}
      </div>
      <SearchBar />
      <HeaderFields
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        onLogout={logoutUser}
        updateRoute={updateRoute}
        userFeeds={userFeeds}
        fetchMoreNotifications={fetchMoreNotifications}
        markSeenNotificationAction={markSeenNotificationAction}
        updateProfileDedication={updateProfileDedication}
      />
    </header>
  );
};

export default Header;

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  fetchMoreNotifications: PropTypes.func,
  markSeenNotificationAction: PropTypes.func,
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object,
  updateProfileDedication: PropTypes.func
};
