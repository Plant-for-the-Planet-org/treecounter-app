import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import { updateRoute } from '../../helpers/routerHelper';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import RoundedButton from '../Common/Button/RoundedButton';
import i18n from '../../locales/i18n.js';

const HeaderFields = ({ isLoggedIn, userProfile, onLogout }) => {
  console.log(userProfile, onLogout);
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover
        button={
          <i className="material-icons"> {i18n.t('label.no_notification')}</i>
        }
      >
        <Notification />
      </Popover>
      <Popover
        button={<img src={ProfilePic} className="image-rounded-border" />}
      >
        <UserDetails userProfile={userProfile} onLogout={onLogout} />
      </Popover>
    </div>
  ) : (
    <div className="header-icons">
      <RoundedButton onClick={updateRoute.bind(this, 'app_login')}>
        {i18n.t('label.logIn')}
      </RoundedButton>
      <RoundedButton onClick={updateRoute.bind(this, 'app_signup')}>
        {i18n.t('label.signUp')}
      </RoundedButton>
    </div>
  );
};

HeaderFields.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default HeaderFields;
