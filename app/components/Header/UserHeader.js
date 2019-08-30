import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useAuth0 } from '../auth0/react-auth0';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import { getImageUrl } from '../../actions/apiRouting';
import ProfilePickerModal from '../EditUserProfile/dedicate-trees/ProfilePickerModal';

// Actions
import { logoutUser } from '../../actions/authActions';
import {
  moreNotificationAction,
  markSeenNotificationAction
} from '../../actions/notificationAction';

import { updateProfileDedication } from '../../actions/updateUserProfile';
import {
  currentUserProfileSelector,
  userFeedsSelector
} from '../../selectors/index';
import { updateRoute } from '../../helpers/routerHelper';

/**
 * The header that an authenticated user sees
 */
const UserHeader = ({
  userFeeds,
  updateRoute,
  userProfile,
  logoutUser,
  fetchMoreNotifications,
  markSeenNotificationAction,
  updateProfileDedication
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuth0();

  // myProfileImage(userProfile, user)
  let profileImage;
  if (userProfile && userProfile.image) {
    profileImage = getImageUrl('profile', 'thumb', userProfile.image);
  }
  if (!profileImage && user) {
    profileImage = user.picture;
  }

  const pickupProfile = value => {
    updateProfileDedication({ supportedTreecounter: value });
    setModalIsOpen(false);
  };

  const markRead = () => {
    if (userFeeds && userFeeds.userFeeds.length) {
      markSeenNotificationAction(userFeeds.userFeeds[0].id);
    }
  };

  return (
    <div className="header-icons">
      <div className="pftp-popover-notification">
        <Popover
          onPopoverClosed={markRead}
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
                <i className="material-icons">notifications_none</i>
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
            src={profileImage || ProfilePic}
            className="image-rounded-border"
          />
        }
      >
        <UserDetails
          updateRoute={updateRoute}
          userProfile={userProfile}
          logoutUser={logoutUser}
          openProfilePickerModal={() => setModalIsOpen(true)}
        />
      </Popover>
      <ProfilePickerModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        pickupProfile={pickupProfile}
      />
    </div>
  );
};

UserHeader.propTypes = {
  fetchMoreNotifications: PropTypes.func,
  markSeenNotificationAction: PropTypes.func,
  userProfile: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object,
  updateProfileDedication: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser,
      moreNotificationAction,
      markSeenNotificationAction,
      updateProfileDedication,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state),
  userFeeds: userFeedsSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
