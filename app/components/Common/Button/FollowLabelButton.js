import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';

const PrimaryButton = ({ isLoggedIn, isSubscribed, onClick }) => {
  const label = isSubscribed
    ? i18n.t('label.un_subscribe')
    : i18n.t('label.subscribe');

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
