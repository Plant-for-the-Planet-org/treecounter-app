import React from 'react';
import PropTypes from 'prop-types';

import SecondaryButton from '../Common/Button/SecondaryButton';

const SupportButton = ({ active, isUserLoggedIn, onRegisterSupporter }) => {
  return isUserLoggedIn ? (
    <SecondaryButton onClick={() => onRegisterSupporter()}>
      supoort user name {active ? 'active' : 'inactive'}
    </SecondaryButton>
  ) : (
    <SecondaryButton onClick={() => onRegisterSupporter()}>
      Log In
    </SecondaryButton>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func
};
export default SupportButton;
