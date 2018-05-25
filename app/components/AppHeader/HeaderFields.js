import React from 'react';
import PropTypes from 'prop-types';

// import UserDetails from './UserDetails';
// import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Notification from './Notification';
import { updateRoute } from '../../helpers/routerHelper';
import Popover from '../Common/Popover';
import { ProfilePic, EditGreen, QuestionMarkGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';

const HeaderFields = ({ isLoggedIn, userProfile, onLogout }) => {
  console.log(userProfile, onLogout);
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover button={<i className="material-icons">notifications_none</i>}>
        <Notification />
      </Popover>
      <Popover
        button={
          <img
            src={ProfilePic}
            className="profile-image image-rounded-border"
          />
        }
      >
        <div className="popover__list-item">
          <div className="list-item__wrapper">
            <img src={ProfilePic} className="profile-image" />
            <div>
              <TextSpan strong={true}>
                {'Hi ' + userProfile.name + '!'}
              </TextSpan>
              <TextSpan>{userProfile.email}</TextSpan>
            </div>
          </div>
        </div>
        <hr className="popover__divider" />
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
        <hr className="popover__divider" />
        <div className="popover__action-link">
          <a onClick={onLogout}>Logout</a>
        </div>
      </Popover>
    </div>
  ) : (
    <div className="header-icons">
      <div
        onClick={updateRoute.bind(this, 'app_login')}
        className="rounded-buttons"
      >
        Log In
      </div>
      <div
        onClick={updateRoute.bind(this, 'app_signup')}
        className="rounded-buttons"
      >
        Sign Up
      </div>
    </div>
  );
};

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default HeaderFields;
