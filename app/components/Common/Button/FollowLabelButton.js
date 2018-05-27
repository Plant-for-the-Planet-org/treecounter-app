import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ isLoggedIn, isSubscribed, onClick }) => {
  const label = isSubscribed
    ? 'label.follow.un_subscribe'
    : 'label.follow.subscribe';

  return isLoggedIn ? (
    <button className="pftp-button-follow" onClick={() => onClick()}>
      {label}
    </button>
  ) : (
    <button className="pftp-button-follow" onClick={() => onClick()}>
      {label}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};

export default PrimaryButton;
