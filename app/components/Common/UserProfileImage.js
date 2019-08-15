import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { ProfilePic } from '../../assets';

const UserProfileImage = ({ profileImage }) => {
  return (
    <div className="header-logo">
      {
        <img
          src={
            profileImage
              ? getImageUrl('profile', 'thumb', profileImage)
              : ProfilePic
          }
        />
      }
    </div>
  );
};

UserProfileImage.propTypes = {
  profileImage: PropTypes.string
};

export default UserProfileImage;
