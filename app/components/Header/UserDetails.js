import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import ReactTooltip from 'react-tooltip';

import {
  EditGreen,
  ProfilePic,
  questionmark_orange,
  QuestionMarkGreen
} from '../../assets';
import i18n from '../../locales/i18n.js';
import { profileImageUrl } from '../../utils/profileImage';
import { useAuth0 } from '../auth0/react-auth0';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TransparentButton from '../Common/Button/TransparentButton';
import TextSpan from '../Common/Text/TextSpan';

const UserDetails = ({ updateRoute, userProfile, openProfilePickerModal }) => {
  const profile = userProfile || {};
  const { user, logout } = useAuth0();

  const logoutUser = () => logout({ redirect: window.location.origin });

  const profileImage = useMemo(() => profileImageUrl(userProfile, user), [
    userProfile,
    user
  ]);

  return (
    <div>
      <div className="popover__list-item">
        <div className="list-item__wrapper">
          <img src={profileImage} />
          <div>
            <TextSpan strong>
              {i18n.t('label.welcome_hi', {
                user: profile.fullname || ''
              })}
            </TextSpan>
            <TextSpan>{profile.email || ''}</TextSpan>
          </div>
        </div>
      </div>
      <hr className="divider__light" />
      <div className="popover__list-item">
        <div className="dedicate-trees">
          <div>{i18n.t('label.dedicate_trees')}</div>
          <div className="tooltip">
            <a data-tip data-for="dedicate-trees-icon">
              <img src={questionmark_orange} />
            </a>
            <ReactTooltip id="dedicate-trees-icon" effect="solid" type="dark">
              <span className="tooltip-text">
                {i18n.t('label.dedicate_tootltip')}
              </span>
            </ReactTooltip>
          </div>
        </div>
        {profile.supportedTreecounter ? (
          <div className="pick-profile-container">
            <div>
              <img src={ProfilePic} />
            </div>
            <div className="pick-profile-username">
              {profile.supportedTreecounter.displayName}
            </div>
            <PrimaryButton
              className="pick-profile-primary-button"
              onClick={openProfilePickerModal}
            >
              {i18n.t('label.edit')}
            </PrimaryButton>
          </div>
        ) : (
          <div className="pick-profile-container">
            <PrimaryButton
              className="pick-profile-primary-button"
              onClick={openProfilePickerModal}
            >
              {i18n.t('label.pick_profile')}
            </PrimaryButton>
          </div>
        )}

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
        <a onClick={logoutUser}>{i18n.t('label.logout')}</a>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  userProfile: PropTypes.object,
  updateRoute: PropTypes.func.isRequired,
  openProfilePickerModal: PropTypes.func.isRequired
};

export default UserDetails;
