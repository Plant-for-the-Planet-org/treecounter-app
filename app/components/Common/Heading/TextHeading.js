import React from 'react';
import PropTypes from 'prop-types';

const TextHeading = ({ children }) => (
  <h2 className="pftp-text-heading">{children}</h2>
);

TextHeading.propTypes = {
  children: PropTypes.node
};

export default TextHeading;
