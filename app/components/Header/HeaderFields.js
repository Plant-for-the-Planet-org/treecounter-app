import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic } from '../../assets';
import Notification from './Notification';
import { updateRoute } from '../../helpers/routerHelper';
import Popover from '../Common/Popover';
import UserDetails from './UserDetails';
import RoundedButton from '../Common/Button/RoundedButton';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const HeaderFields = ({ isLoggedIn, userProfile, onLogout }) => {
  console.log(userProfile, onLogout);
  return isLoggedIn ? (
    <div className="header-icons">
      <Popover
        button={
          <i className="material-icons">
            {' '}
            {i18n.t('label.headerlabels.no_notification', { lng })}
          </i>
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
        {i18n.t('label.headerlabels.logIn', { lng })}
      </RoundedButton>
      <RoundedButton onClick={updateRoute.bind(this, 'app_signup')}>
        {i18n.t('label.headerlabels.signUp', { lng })}
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
