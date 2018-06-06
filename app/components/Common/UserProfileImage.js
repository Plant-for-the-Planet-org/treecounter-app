import React from 'react';
import PropTypes from 'prop-types';
import { profile } from '../../assets';

const UserProfileImage = ({ profileImage }) => {
  return (
    <div className="header-logo">
      {<img src={profileImage ? profileImage : profile} />}
    </div>
  );
};

UserProfileImage.propTypes = {
  profileImage: PropTypes.string
};

export default UserProfileImage;
