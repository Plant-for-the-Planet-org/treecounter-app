import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import RoundedButton from '../Common/Button/RoundedButton';
import i18n from '../../locales/i18n.js';
import { getImageUrl } from '../../actions/apiRouting';
import ProfilePickerModal from '../EditUserProfile/dedicate-trees/ProfilePickerModal';

class HeaderFields extends Component {
  constructor() {
    super();
    this.state = { profilePickerModal: false };
  }

  openProfilePickerModal() {
    this.setState({ profilePickerModal: true });
  }
  closeProfilePickerModal() {
    this.setState({ profilePickerModal: false });
  }

  pickupProfile(value) {
    this.props.updateProfileDedication({ supportedTreecounter: value });
    this.closeProfilePickerModal();
  }
  render() {
    const {
      userFeeds,
      updateRoute,
      isLoggedIn,
      userProfile,
      onLogout,
      fetchMoreNotifications,
      markSeenNotificationAction
    } = this.props;

    return isLoggedIn ? (
      <div className="header-icons">
        <div className="pftp-popover-notification">
          <Popover
            onPopoverClosed={() => {
              userFeeds && userFeeds.userFeeds.length
                ? markSeenNotificationAction(userFeeds.userFeeds[0].id)
                : null;
            }}
            button={
              <div className="notification-bell">
                <div
                  className={
                    userFeeds && userFeeds.unRead > 0
                      ? 'unread-circle'
                      : 'unread-circle adjust-zindex'
                  }
                >
                  <span className="unread-number-align">
                    {userFeeds && userFeeds.unRead > 0 ? userFeeds.unRead : 0}
                  </span>
                </div>
                <div className="bell-icon">
                  <i className="material-icons">
                    {i18n.t('label.no_notifications')}
                  </i>
                </div>
              </div>
            }
          >
            <Notification
              fetchMoreNotifications={fetchMoreNotifications}
              userFeeds={userFeeds}
            />
          </Popover>
        </div>
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
            openProfilePickerModal={this.openProfilePickerModal.bind(this)}
          />
        </Popover>
        <ProfilePickerModal
          isOpen={this.state.profilePickerModal}
          onRequestClose={this.closeProfilePickerModal.bind(this)}
          pickupProfile={this.pickupProfile.bind(this)}
        />
      </div>
    ) : (
      <div className="header-icons">
        <RoundedButton onClick={updateRoute.bind(this, 'app_login')}>
          {i18n.t('label.login')}
        </RoundedButton>
        <RoundedButton onClick={updateRoute.bind(this, 'app_signup')}>
          {i18n.t('label.signUp')}
        </RoundedButton>
        <ProfilePickerModal
          isOpen={this.state.profilePickerModal}
          onRequestClose={this.closeProfilePickerModal.bind(this)}
          pickupProfile={this.pickupProfile.bind(this)}
        />
      </div>
    );
  }
}

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  fetchMoreNotifications: PropTypes.func,
  markSeenNotificationAction: PropTypes.func,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object,
  updateProfileDedication: PropTypes.func
};

export default HeaderFields;
