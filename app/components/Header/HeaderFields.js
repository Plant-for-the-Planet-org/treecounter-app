import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import RoundedButton from '../Common/Button/RoundedButton';
import i18n from '../../locales/i18n.js';
import { getImageUrl } from '../../actions/apiRouting';

const HeaderFields = ({
  userFeeds,
  updateRoute,
  isLoggedIn,
  userProfile,
  onLogout
}) => {
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover
        button={
          <div className="notification-bell">
            <div className="unread-circle">{userFeeds.unRead}</div>
            <i className="material-icons">notifications_none</i>
          </div>
        }
      >
        <Notification userFeeds={userFeeds} />
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
        {i18n.t('label.login')}
      </RoundedButton>
      <RoundedButton onClick={updateRoute.bind(this, 'app_signup')}>
        {i18n.t('label.signUp')}
      </RoundedButton>
    </div>
  );
};

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object
};

export default HeaderFields;
