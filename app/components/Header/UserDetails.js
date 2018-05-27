import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic, EditGreen, QuestionMarkGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';

const UserDetails = ({ userProfile, onLogout }) => {
  return (
    <div>
      <div className="popover__list-item">
        <div className="list-item__wrapper">
          <img src={ProfilePic} className="profile-image" />
          <div>
            <TextSpan strong={true}>{'Hi ' + userProfile.name + '!'}</TextSpan>
            <TextSpan>{userProfile.email}</TextSpan>
          </div>
        </div>
      </div>
      <hr className="divider__light" />
      <div className="popover__list-item">
        <a className="list-item__wrapper gap-14">
          <img src={EditGreen} className="help-icons" />
          <span className="popover__green-text">Edit Profile</span>
        </a>
        <a className="list-item__wrapper">
          <img src={QuestionMarkGreen} className="help-icons" />
          <span className="popover__green-text">Help</span>
        </a>
      </div>
      <hr className="divider__light" />
      <div className="popover__action-link">
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
