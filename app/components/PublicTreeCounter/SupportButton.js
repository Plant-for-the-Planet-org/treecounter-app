import React from 'react';
import PropTypes from 'prop-types';
import { gift_icon } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n.js';

const SupportButton = ({ active, isUserLoggedIn, onRegisterSupporter }) => {
  return (
    <div className="gift-icon">
      <div className="display-text">
        <SecondaryButton
          onClick={() =>
            isUserLoggedIn && active ? onRegisterSupporter() : null
          }
        >
          {i18n.t('label.support')}
          {/* <span className="support-button-caption">{caption}</span> */}
        </SecondaryButton>
      </div>
      <div className="display-icon">
        <img
          src={gift_icon}
          onClick={() =>
            isUserLoggedIn && active ? onRegisterSupporter() : null
          }
        />
      </div>
    </div>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func
};
export default SupportButton;
