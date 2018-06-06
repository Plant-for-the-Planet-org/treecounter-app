import React from 'react';
import PropTypes from 'prop-types';
import { profile } from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';

const UserProfileImage = ({ profileImage }) => {
  return (
    <div className="header-logo">
      {
        <img
          src={
            profileImage
              ? getImageUrl('profile', 'thumb', profileImage)
              : profile
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
