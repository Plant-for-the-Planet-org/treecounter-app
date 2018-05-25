import React from 'react';
import PropTypes from 'prop-types';

// import UserDetails from './UserDetails';
// import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Notification from './Notification';
import { updateRoute } from '../../helpers/routerHelper';
import Popover from '../Common/Popover';
import { ProfilePic } from '../../assets';

// const popoverNotification = (
//   <Popover id="popover-trigger-focus">
//     <Notification />
//   </Popover>
// );

// const popoverAccount = (userProfile, onLogout) => (
//   <Popover id="popover-trigger-focus">
//     <UserDetails userProfile={userProfile} onLogout={onLogout} />
//   </Popover>
// );

const HeaderFields = ({ isLoggedIn, userProfile, onLogout }) => {
  console.log(userProfile, onLogout);
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover button={<i className="material-icons">notifications_none</i>}>
        <Notification />
      </Popover>
      <Popover button={<img src={ProfilePic} className="profile-image" />}>
        <div className="popover__list-item">Dummy</div>
      </Popover>
      {/* <OverlayTrigger
        trigger="focus"
        placement="bottom"
        overlay={popoverAccount(userProfile, onLogout)}
      >
        <Button>
          <i className="material-icons">account_circle</i>
        </Button>
      </OverlayTrigger> */}
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
