import React from 'react';
import PropTypes from 'prop-types';

import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n.js';
let lng = 'en';

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
      {i18n.t('label.publicTreecounterlabels.support', { lng })}
      <span className="support-button-caption">{caption}</span>
    </SecondaryButton>
  ) : (
    <SecondaryButton onClick={() => onRegisterSupporter()} disable={true}>
      {i18n.t('label.publicTreecounterlabels.support', { lng })}
      <span className="support-button-caption">{caption}</span>
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
