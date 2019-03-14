import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ onClick, children, className }) => (
  <button
    className={className + ' pftp-button-primary'}
    onClick={onClick ? e => onClick(e) : null}
  >
    {children}
  </button>
);

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default PrimaryButton;
