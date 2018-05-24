import React from 'react';
import PropTypes from 'prop-types';

const UserProfileTypeLabel = ({ profileType }) => {
  return <span>{`${profileType}`}</span>;
};

UserProfileTypeLabel.propTypes = {
  profileType: PropTypes.string
};

export default UserProfileTypeLabel;
