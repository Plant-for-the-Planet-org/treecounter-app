import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  markSeenNotificationAction,
  moreNotificationAction
} from '../../actions/notificationAction';
import { updateProfileDedication } from '../../actions/updateUserProfile';
import { updateRoute } from '../../helpers/routerHelper';
import { currentUserProfileSelector, userFeedsSelector } from '../../selectors';
import { profileImageUrl } from '../../utils/profileImage';
import { useAuth0 } from '../auth0/Auth0Provider';
import Popover from '../Common/Popover';
import ProfilePickerModal from '../EditUserProfile/dedicate-trees/ProfilePickerModal';
import Notification from './Notification';
import UserDetails from './UserDetails';

/**
 * The header that an authenticated user sees
 */
const UserHeader = ({
  userFeeds,
  updateRoute,
  userProfile,
  fetchMoreNotifications,
  markSeenNotificationAction,
  updateProfileDedication
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuth0();

  const profileImage = useMemo(() => profileImageUrl(userProfile, user), [
    userProfile,
    user
  ]);

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
        button={<img src={profileImage} className="image-rounded-border" />}
      >
        <UserDetails
          updateRoute={updateRoute}
          userProfile={userProfile}
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
  updateRoute: PropTypes.func,
  userFeeds: PropTypes.object,
  updateProfileDedication: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      moreNotificationAction,
      markSeenNotificationAction,
      updateProfileDedication,
      updateRoute: (routeName, id) => dispatch =>
        updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state),
  userFeeds: userFeedsSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
