import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const TextBlock = ({ children, strong }) => (
  <Text styles={'pftp-text-block ' + (strong ? 'bold' : '')}>{children}</Text>
);

TextBlock.propTypes = {
  children: PropTypes.node,
  strong: PropTypes.bool
};

export default TextBlock;
