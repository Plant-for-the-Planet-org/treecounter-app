import React from 'react';
import { useSelector } from 'react-redux';

import { useAuth0 } from '../auth0/Auth0Provider';
import AnonHeader from './AnonHeader';
import BurgerMenu from './BurgerMenu';
import HomeButton from './HomeButton';
import SearchBar from './Search';
import UserHeader from './UserHeader';
import { currentUserProfileSelector } from '../../selectors';

const Header = () => {
  const { loading } = useAuth0();
  const userProfile = useSelector(currentUserProfileSelector);

  // Hide the the header while authenticating / relocating
  // const auth0callback = window.location.pathname === '/auth0-callback';

  return (
    <header className="app-header">
      <div className="app-header__home">
        <BurgerMenu />
        {userProfile ? <HomeButton /> : null}
      </div>
      <SearchBar />
      {userProfile ? <UserHeader /> : <AnonHeader hidden={loading} />}
    </header>
  );
};

export default Header;
