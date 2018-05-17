import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ children }) => (
  <div className="pftp-text-block">{children}</div>
);

TextBlock.propTypes = {
  children: PropTypes.string
};

export default TextBlock;
