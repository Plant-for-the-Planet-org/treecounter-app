import React from 'react';
import PropTypes from 'prop-types';

// Components
import SearchBar from './Search';
import HeaderFields from './HeaderFields';
import BurgerMenu from './BurgerMenu';
import HomeButton from './HomeButton';

const Header = ({
  userFeeds,
  updateRoute,
  logoutUser,
  userProfile,
  fetchMoreNotifications
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
      />
    </header>
  );
};

export default Header;

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  fetchMoreNotifications: PropTypes.func,
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object
};
