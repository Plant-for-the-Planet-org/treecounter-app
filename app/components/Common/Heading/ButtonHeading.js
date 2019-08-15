import React from 'react';
import PropTypes from 'prop-types';

const ButtonHeading = ({ children }) => (
  <div className="pftp-button-heading">
    <div>{children}</div>
  </div>
);

ButtonHeading.propTypes = {
  children: PropTypes.node
};

export default ButtonHeading;
