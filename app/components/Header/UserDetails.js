import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePic, EditGreen, QuestionMarkGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import TransparentButton from '../Common/Button/TransparentButton';
import i18n from '../../locales/i18n.js';
import { getImageUrl } from '../../actions/apiRouting';

const UserDetails = ({ updateRoute, userProfile, onLogout }) => {
  return (
    <div>
      <div className="popover__list-item">
        <div className="list-item__wrapper">
          <img
            src={
              userProfile.image
                ? getImageUrl('profile', 'thumb', userProfile.image)
                : ProfilePic
            }
          />
          <div>
            <TextSpan strong={true}>
              {i18n.t('label.welcome_hi') +
                userProfile.fullname +
                i18n.t('label.welcome_symbol')}
            </TextSpan>
            <TextSpan>{userProfile.email}</TextSpan>
          </div>
        </div>
      </div>
      <hr className="divider__light" />
      <div className="popover__list-item">
        <TransparentButton onClick={() => updateRoute('app_editProfile')}>
          <img src={EditGreen} />
          <span>{i18n.t('label.edit_profile')}</span>
        </TransparentButton>
        <TransparentButton onClick={() => updateRoute('app_faq')}>
          <img src={QuestionMarkGreen} />
          <span>{i18n.t('label.help')}</span>
        </TransparentButton>
      </div>
      <hr className="divider__light" />
      <div className="popover__action-link">
        <a onClick={onLogout}>{i18n.t('label.logout')}</a>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  userProfile: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  updateRoute: PropTypes.func
};

export default UserDetails;
