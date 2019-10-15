import React from 'react';
import PropTypes from 'prop-types';

import FollowLabelButton from '../Common/Button/FollowLabelButton';
import UserProfileImage from '../Common/UserProfileImage';

import * as images from '../../assets';

const TreecounterHeader = ({
  caption,
  profileType,
  logo,
  isUserFollowerBool,
  /* isUserLoggedIn, */
  showFollow,
  followChanged
}) => {
  const onlyFirstName = text => {
    let c = text.split(' ');
    if (c.length > 1) c.length--;
    return c.join(' ');
  };
  return (
    <div className="tree-counter-profile flex-column">
      <UserProfileImage profileImage={logo} />
      <div className="user-info">
        <div className="tree-counter-name">{onlyFirstName(caption)}</div>
        <div className="tree-counter-row">
          {!!profileType && (
            <img
              className="profile-type-image"
              src={
                profileType === 'education'
                  ? images['schoolIcon']
                  : profileType === 'tpo'
                    ? images['tpoIcon']
                    : profileType === 'company'
                      ? images['companyIcon']
                      : images['individualIcon']
              }
            />
          )}
          {showFollow && (
            <FollowLabelButton
              isSubscribed={isUserFollowerBool}
              onClick={() => followChanged()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

TreecounterHeader.propTypes = {
  caption: PropTypes.string.isRequired,
  profileType: PropTypes.string,
  logo: PropTypes.string,
  isUserFollowerBool: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  showFollow: PropTypes.bool.isRequired,
  followChanged: PropTypes.func.isRequired
};

export default TreecounterHeader;
