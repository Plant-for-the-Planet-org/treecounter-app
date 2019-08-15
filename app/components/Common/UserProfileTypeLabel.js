import React from 'react';
import PropTypes from 'prop-types';

const UserProfileTypeLabel = ({ profileType }) => {
  return (
    <div className="profile-type-container flex-column">
      <span className="profile-type-label">{`${profileType}`}</span>
    </div>
  );
};

UserProfileTypeLabel.propTypes = {
  profileType: PropTypes.string
};

export default UserProfileTypeLabel;
