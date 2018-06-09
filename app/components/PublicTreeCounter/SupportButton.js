import React from 'react';
import PropTypes from 'prop-types';

import SecondaryButton from '../Common/Button/SecondaryButton';

const SupportButton = ({
  active,
  isUserLoggedIn,
  caption,
  onRegisterSupporter
}) => {
  console.log(caption);
  return isUserLoggedIn ? (
    <SecondaryButton
      onClick={() => onRegisterSupporter()}
      disable={active ? 'active' : 'inactive'}
    >
      Support
      {/* <span className="support-button-caption">{caption}</span> */}
    </SecondaryButton>
  ) : (
    <SecondaryButton onClick={() => onRegisterSupporter()} disable={true}>
      Support
      {/* <span className="support-button-caption">{caption}</span> */}
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
