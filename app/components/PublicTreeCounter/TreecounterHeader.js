import React from 'react';
import PropTypes from 'prop-types';

// import UserProfileTypeLabel from '../Common/UserProfileTypeLabel';
import FollowLabelButton from '../Common/Button/FollowLabelButton';

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
    <div>
      <div>Logo: {logo}</div>
      <div>{caption}</div>
      <div>
        <UserProfileTypeLabel profileType={profileType} /> |
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
