import React from 'react';
import PropTypes from 'prop-types';

const TextSpan = ({ children, strong, className }) => (
  <div
    className={
      'pftp-text-span ' + (strong ? 'bold ' : '') + (className ? className : '')
    }
  >
    {' '}
    {children}
  </div>
);

TextSpan.propTypes = {
  children: PropTypes.any,
  strong: PropTypes.bool,
  className: PropTypes.string
};

export default TextSpan;
