import React from 'react';
import PropTypes from 'prop-types';
import { gift_icon } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n.js';

const SupportButton = ({ active, isUserLoggedIn, onRegisterSupporter }) => {
  return isUserLoggedIn ? (
    <div className="gift-icon">
      <div className="display-text">
        <SecondaryButton
          onClick={() => onRegisterSupporter()}
          disable={active ? 'active' : 'inactive'}
        >
          {i18n.t('label.support')}
          {/* <span className="support-button-caption">{caption}</span> */}
        </SecondaryButton>
      </div>
      <div className="display-icon">
        <img
          src={gift_icon}
          onClick={() => onRegisterSupporter()}
          disable={active ? 'active' : 'inactive'}
        />
      </div>
    </div>
  ) : (
    <div className="gift-icon">
      <div className="display-text">
        <SecondaryButton onClick={() => onRegisterSupporter()} disable={true}>
          {i18n.t('label.support')}
          {/* <span className="support-button-caption">{caption}</span> */}
        </SecondaryButton>
      </div>
      <div className="display-icon">
        <img
          src={gift_icon}
          onClick={() => onRegisterSupporter()}
          disable={true}
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
