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
  onLogout,
  fetchMoreNotifications,
  markSeenNotificationAction
}) => {
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover
        onPopoverClosed={() =>
          markSeenNotificationAction(userFeeds.userFeeds[0].id)
        }
        button={
          <div className="notification-bell">
            {userFeeds && userFeeds.unRead > 0 ? (
              <div className="unread-circle">
                <span className="unread-number-align">{userFeeds.unRead}</span>
              </div>
            ) : null}
            <i className="material-icons">{i18n.t('label.no_notifications')}</i>
          </div>
        }
      >
        <Notification
          fetchMoreNotifications={fetchMoreNotifications}
          userFeeds={userFeeds}
        />
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
  fetchMoreNotifications: PropTypes.func,
  markSeenNotificationAction: PropTypes.func,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object
};

export default HeaderFields;
