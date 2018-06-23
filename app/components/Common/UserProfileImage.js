import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';

const UserProfileImage = ({ profileImage, iconUrl }) => {
  return (
    <div className="header-logo">
      {
        <img
          src={
            profileImage
              ? getImageUrl('profile', 'thumb', profileImage)
              : iconUrl
          }
        />
      }
    </div>
  );
};

UserProfileImage.propTypes = {
  profileImage: PropTypes.string,
  iconUrl: PropTypes.string
};

export default UserProfileImage;
