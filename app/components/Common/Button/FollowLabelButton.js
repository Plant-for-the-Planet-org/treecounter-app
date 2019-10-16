import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';

const FollowLabelButton = ({ isSubscribed, onClick, label = undefined }) => {
  label =
    label ||
    (isSubscribed ? i18n.t('label.unsubscribe') : i18n.t('label.subscribe'));

  return (
    <button
      className={isSubscribed ? 'pftp-button-following' : 'pftp-button-follow'}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};

FollowLabelButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  label: PropTypes.string
};

export default FollowLabelButton;
