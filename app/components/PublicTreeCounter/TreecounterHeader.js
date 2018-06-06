import React from 'react';
import PropTypes from 'prop-types';

import UserProfileTypeLabel from '../Common/UserProfileTypeLabel';
import FollowLabelButton from '../Common/Button/FollowLabelButton';
import UserProfileImage from '../Common/UserProfileImage';

const TreecounterHeader = ({
  caption,
  profileType,
  logo,
  isUserFollower,
  isUserLoggedIn,
  showFollow,
  followChanged
}) => {
  return (
    <div className="tree-counter-profile flex-column">
      <UserProfileImage profileImage={logo} />
      <div className="tree-counter-name">{caption}</div>
      <div className="tree-counter-row">
        <UserProfileTypeLabel profileType={profileType} />
        {showFollow && (
          <FollowLabelButton
            isSubscribed={isUserFollower}
            isLoggedIn={isUserLoggedIn}
            onClick={() => followChanged()}
          />
        )}
      </div>
    </div>
  );
};

TreecounterHeader.propTypes = {
  caption: PropTypes.string.isRequired,
  profileType: PropTypes.string.isRequired,
  logo: PropTypes.string,
  isUserFollower: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  showFollow: PropTypes.bool.isRequired,
  followChanged: PropTypes.func.isRequired
};

export default TreecounterHeader;
