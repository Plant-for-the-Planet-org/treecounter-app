import React from "react";
import PropTypes from "prop-types";

import UserDetails from "./UserDetails";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import Notification from "./Notification";
import * as constants from '../../SupportedLanguages/en';
import {getLocalRoute} from "../../actions/apiRouting";

const popoverNotification = (
  <Popover id="popover-trigger-focus">
    <Notification/>
  </Popover>
);

const popoverAccount = (userProfile, onLogout) => (
  <Popover id="popover-trigger-focus">
    <UserDetails userProfile={userProfile} onLogout={onLogout}/>
  </Popover>
);

const HeaderFields = ({isLoggedIn, userProfile, onLogout}) => {

  console.log("HeaderFields", window.location.pathname, getLocalRoute("app_login"));

  return isLoggedIn ?
    <div className="header-icons">
      <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverNotification}>
        <Button>
          <i className="material-icons">notifications_none</i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverAccount(userProfile, onLogout)}>
        <Button>
          <i className="material-icons">account_circle</i>
        </Button>
      </OverlayTrigger>
    </div>
    :
    <div className="header-icons no-login">
      <a href={getLocalRoute("app_login")}>{constants.formStrings.logIn}</a>
    </div>;
};

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default HeaderFields;
