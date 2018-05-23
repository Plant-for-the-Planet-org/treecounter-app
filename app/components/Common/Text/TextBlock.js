import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ children, strong }) => (
  <div className={'pftp-text-block ' + (strong ? 'bold' : '')}>{children}</div>
);

TextBlock.propTypes = {
  children: PropTypes.array,
  strong: PropTypes.bool
};

export default TextBlock;
