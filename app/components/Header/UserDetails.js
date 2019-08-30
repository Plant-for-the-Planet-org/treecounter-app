import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import {
  ProfilePic,
  EditGreen,
  QuestionMarkGreen,
  questionmark_orange
} from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import TransparentButton from '../Common/Button/TransparentButton';
import i18n from '../../locales/i18n.js';
// import { getImageUrl } from '../../actions/apiRouting';
import UserProfileImage from '../Common/UserProfileImage';
import PrimaryButton from '../Common/Button/PrimaryButton';

const UserDetails = ({
  updateRoute,
  userProfile,
  logoutUser,
  openProfilePickerModal
}) => {
  const profile = userProfile || {};
  return (
    <div>
      <div className="popover__list-item">
        <div className="list-item__wrapper">
          <UserProfileImage profileImage={profile.image} />
          {/* <img
            src={
              userProfile.image
                ? getImageUrl('profile', 'thumb', userProfile.image)
                : ProfilePic
            }
          /> */}
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
              onClick={() => openProfilePickerModal()}
            >
              {i18n.t('label.edit')}
            </PrimaryButton>
          </div>
        ) : (
          <div className="pick-profile-container">
            <PrimaryButton
              className="pick-profile-primary-button"
              onClick={() => openProfilePickerModal()}
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
  logoutUser: PropTypes.func.isRequired,
  updateRoute: PropTypes.func,
  openProfilePickerModal: PropTypes.func
};

export default UserDetails;
