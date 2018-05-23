import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ onClick, children }) => (
  <button className="pftp-button-secondary" onClick={() => onClick()}>
    {children}
  </button>
);

SecondaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default SecondaryButton;
