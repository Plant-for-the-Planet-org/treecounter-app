import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import RoundedButton from '../Common/Button/RoundedButton';
import { getImageUrl } from '../../actions/apiRouting';

const HeaderFields = ({ updateRoute, isLoggedIn, userProfile, onLogout }) => {
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover button={<i className="material-icons">notifications_none</i>}>
        <Notification />
      </Popover>
      <Popover
        button={
          <img
            src={
              userProfile.image
                ? getImageUrl('profile', 'thumb', userProfile.image)
                : ProfilePic
            }
            className="image-rounded-border"
          />
        }
      >
        <UserDetails
          updateRoute={updateRoute}
          userProfile={userProfile}
          onLogout={onLogout}
        />
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
  onLogout: PropTypes.func.isRequired,
  updateRoute: PropTypes.func
};

export default HeaderFields;
