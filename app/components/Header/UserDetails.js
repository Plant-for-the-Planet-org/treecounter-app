import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { ProfilePic, EditGreen, QuestionMarkGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import TransparentButton from '../Common/Button/TransparentButton';
// import { getLocalRoute } from '../../actions/apiRouting';
import { history } from '../../components/Common/BrowserRouter';

const UserDetails = ({ userProfile, onLogout }) => {
  return (
    <div>
      <div className="popover__list-item">
        <div className="list-item__wrapper">
          <img src={ProfilePic} />
          <div>
            <TextSpan strong={true}>{'Hi ' + userProfile.name + '!'}</TextSpan>
            <TextSpan>{userProfile.email}</TextSpan>
          </div>
        </div>
      </div>
      <hr className="divider__light" />
      <div className="popover__list-item">
        <TransparentButton
          onClick={() => {
            console.log('edit profile');
            history.push('edit_profile');
          }}
        >
          <img src={EditGreen} />
          <span>Edit Profile</span>
          {/* <Link to="edit_profile" className="search-autusuggest__listitem" /> */}
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
  onLogout: PropTypes.func.isRequired
};

export default UserDetails;
