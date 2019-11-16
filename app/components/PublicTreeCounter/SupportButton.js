import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { gift_icon } from '../../assets';
const SecondaryButton = lazy(() => import('../Common/Button/SecondaryButton'));

const SupportButton = ({ onRegisterSupporter, buttonLabel }) => {
  return (
    <div className="gift-icon">
      <div className="display-text">
        <SecondaryButton onClick={() => onRegisterSupporter()}>
          {/* {i18n.t('label.support')} */}
          {buttonLabel}
        </SecondaryButton>
      </div>
      <div className="display-icon">
        <img src={gift_icon} onClick={() => onRegisterSupporter()} />
      </div>
    </div>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool,
  isUserLoggedIn: PropTypes.bool,
  onRegisterSupporter: PropTypes.func,
  buttonLabel: PropTypes.string
};
export default SupportButton;
