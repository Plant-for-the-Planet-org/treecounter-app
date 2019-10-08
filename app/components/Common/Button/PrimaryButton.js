import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({
  onClick,
  children,
  className = '',
  disabled = false
}) => (
  <button
    className={'pftp-button-primary ' + className}
    onClick={onClick ? e => onClick(e) : null}
    disabled={disabled}
  >
    {children}
  </button>
);

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default PrimaryButton;
