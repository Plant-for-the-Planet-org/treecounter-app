import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Components
import SearchBar from './Search';
import HeaderFields from './HeaderFields';
import BurgerMenu from './BurgerMenu';
import HomeButton from './HomeButton';

// Actions
import { logoutUser } from '../../actions/authActions';
import { currentUserProfileSelector } from '../../selectors/index';

const Header = ({ isLoggedIn, logoutUser, userProfile }) => {
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
      />
    </header>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser }, dispatch);
};

const mapStateToProps = state => ({
  isLoggedIn: null !== currentUserProfileSelector(state),
  userProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.object.isRequired,
  userProfile: PropTypes.func.isRequired
};
