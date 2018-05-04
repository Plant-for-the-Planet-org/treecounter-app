import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = ({ userProfile, onLogout }) => {
  return null === userProfile ? null : (
    <div className="account-popover">
      <i className="material-icons">account_box</i>
      <div className="account-popover__content">
        <strong>
          <span>{userProfile.name}</span>
        </strong>
        <span>{userProfile.email}</span>
        <span>
          {userProfile.firstname} {userProfile.lastname}
        </span>

        <a onClick={onLogout}>Logout</a>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default UserDetails;
