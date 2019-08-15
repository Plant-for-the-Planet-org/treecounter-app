import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ onClick, children, className }) => (
  <button
    className={'pftp-button-secondary ' + className}
    onClick={() => onClick()}
  >
    {children}
  </button>
);

SecondaryButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default SecondaryButton;
