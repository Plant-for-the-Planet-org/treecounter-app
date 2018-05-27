import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import { updateRoute } from '../../helpers/routerHelper';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';

const HeaderFields = ({ isLoggedIn, userProfile, onLogout }) => {
  console.log(userProfile, onLogout);
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover button={<i className="material-icons">notifications_none</i>}>
        <Notification />
      </Popover>
      <Popover
        button={
          <img
            src={ProfilePic}
            className="profile-image image-rounded-border"
          />
        }
      >
        <UserDetails userProfile={userProfile} onLogout={onLogout} />
      </Popover>
    </div>
  ) : (
    <div className="header-icons">
      <div
        onClick={updateRoute.bind(this, 'app_login')}
        className="rounded-buttons"
      >
        Log In
      </div>
      <div
        onClick={updateRoute.bind(this, 'app_signup')}
        className="rounded-buttons"
      >
        Sign Up
      </div>
    </div>
  );
};

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default HeaderFields;
