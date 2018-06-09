import React from 'react';
import PropTypes from 'prop-types';
import { ProfilePic, EditGreen, QuestionMarkGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import TransparentButton from '../Common/Button/TransparentButton';
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
            <TextSpan strong={true}>{'Hi ' + userProfile.name + '!'}</TextSpan>
            <TextSpan>{userProfile.email}</TextSpan>
          </div>
        </div>
      </div>
      <hr className="divider__light" />
      <div className="popover__list-item">
        <TransparentButton onClick={() => updateRoute('app_editProfile')}>
          <img src={EditGreen} />
          <span>Edit Profile</span>
        </TransparentButton>
        <TransparentButton>
          <img src={QuestionMarkGreen} />
          <span>Help</span>
        </TransparentButton>
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
  onLogout: PropTypes.func.isRequired,
  updateRoute: PropTypes.func
};

export default UserDetails;
