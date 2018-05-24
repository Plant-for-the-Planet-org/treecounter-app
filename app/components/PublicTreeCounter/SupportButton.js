import React from 'react';
import PropTypes from 'prop-types';

import SecondaryButton from '../Common/Button/SecondaryButton';

const SupportButton = ({
  active,
  isUserLoggedIn,
  caption,
  onRegisterSupporter
}) => {
  return isUserLoggedIn ? (
    <SecondaryButton
      onClick={() => onRegisterSupporter()}
      disable={active ? 'active' : 'inactive'}
    >
      Support {caption}
    </SecondaryButton>
  ) : (
    <SecondaryButton onClick={() => onRegisterSupporter()} disable={true}>
      Log In to Support {caption}
    </SecondaryButton>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  onRegisterSupporter: PropTypes.func
};
export default SupportButton;
