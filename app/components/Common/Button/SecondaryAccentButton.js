import React from 'react';
import PropTypes from 'prop-types';

const SecondaryAccentButton = ({ onClick, children }) => (
  <button className="pftp-button-follow" onClick={() => onClick()}>
    {children}
  </button>
);

SecondaryAccentButton.propTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func
};

export default SecondaryAccentButton;
