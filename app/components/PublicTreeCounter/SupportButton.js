import React from 'react';
import PropTypes from 'prop-types';
import { gift_icon } from '../../assets';
import SecondaryButton from '../Common/Button/SecondaryButton';

const SupportButton = ({
  active,
  isUserLoggedIn,
  onRegisterSupporter,
  buttonLabel
}) => {
  return (
    <div className="gift-icon">
      <div className="display-text">
        <SecondaryButton onClick={() => onRegisterSupporter()}>
          {/* {i18n.t('label.support')} */}
          {buttonLabel}
        </SecondaryButton>
      </div>
      {/* <div className="display-icon">
        <img
          src={gift_icon}
          onClick={() =>
            isUserLoggedIn && active ? onRegisterSupporter() : null
          }
        />
      </div> */}
    </div>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func,
  buttonLabel: PropTypes.string
};
export default SupportButton;
