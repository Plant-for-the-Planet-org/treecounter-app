import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = props => (
  <button className="pftp-button-primary">{props.children}</button>
);

PrimaryButton.propTypes = {
  children: PropTypes.string
};

export default PrimaryButton;
