import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic, EditGreen, QuestionMarkGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import TransparentButton from '../Common/Button/TransparentButton';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const UserDetails = ({ userProfile, onLogout }) => {
  return (
    <div>
      <div className="popover__list-item">
        <div className="list-item__wrapper">
          <img src={ProfilePic} />
          <div>
            <TextSpan strong={true}>
              {i18n.t('label.headerlabels.welcome_hi', { lng }) +
                userProfile.name +
                i18n.t('label.headerlabels.welcome_symbol', { lng })}
            </TextSpan>
            <TextSpan>{userProfile.email}</TextSpan>
          </div>
        </div>
      </div>
      <hr className="divider__light" />
      <div className="popover__list-item">
        <TransparentButton>
          <img src={EditGreen} />
          <span>{i18n.t('label.headerlabels.edit_profile', { lng })}</span>
        </TransparentButton>
        <TransparentButton>
          <img src={QuestionMarkGreen} />
          <span>{i18n.t('label.headerlabels.help', { lng })}</span>
        </TransparentButton>
      </div>
      <hr className="divider__light" />
      <div className="popover__action-link">
        <a onClick={onLogout}>{i18n.t('label.headerlabels.logout', { lng })}</a>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default UserDetails;
