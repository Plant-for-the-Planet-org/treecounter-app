import React from 'react';
import PropTypes from 'prop-types';

const TextSpan = ({ children, strong }) => (
  <div className={'pftp-text-span ' + (strong ? 'bold' : '')}>{children}</div>
);

TextSpan.propTypes = {
  children: PropTypes.string,
  strong: PropTypes.bool
};

export default TextSpan;
