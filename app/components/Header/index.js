import React from 'react';

import { useAuth0 } from '../auth0/react-auth0';
import AnonHeader from './AnonHeader';
import BurgerMenu from './BurgerMenu';
import HomeButton from './HomeButton';
import SearchBar from './Search';
import UserHeader from './UserHeader';

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="app-header">
      <div className="app-header__home">
        <BurgerMenu />
        {isAuthenticated ? <HomeButton /> : null}
      </div>
      <SearchBar />
      {isAuthenticated ? <UserHeader /> : <AnonHeader />}
    </header>
  );
};

export default Header;
