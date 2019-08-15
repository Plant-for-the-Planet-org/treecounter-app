import React from 'react';
import PropTypes from 'prop-types';

const RoundedButton = ({ onClick, children }) => (
  <button className="pftp-button-rounded" onClick={() => onClick()}>
    {children}
  </button>
);

RoundedButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default RoundedButton;
