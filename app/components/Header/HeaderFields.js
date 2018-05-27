import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import { updateRoute } from '../../helpers/routerHelper';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import RoundedButton from '../Common/Button/RoundedButton';

const HeaderFields = ({ isLoggedIn, userProfile, onLogout }) => {
  console.log(userProfile, onLogout);
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover button={<i className="material-icons">notifications_none</i>}>
        <Notification />
      </Popover>
      <Popover
        button={<img src={ProfilePic} className="image-rounded-border" />}
      >
        <UserDetails userProfile={userProfile} onLogout={onLogout} />
      </Popover>
    </div>
  ) : (
    <div className="header-icons">
      <RoundedButton onClick={updateRoute.bind(this, 'app_login')}>
        Log In
      </RoundedButton>
      <RoundedButton onClick={updateRoute.bind(this, 'app_signup')}>
        Sign Up
      </RoundedButton>
    </div>
  );
};

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default HeaderFields;
