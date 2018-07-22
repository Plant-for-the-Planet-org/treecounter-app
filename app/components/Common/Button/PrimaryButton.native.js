import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../../styles/common/button';
import { TouchableHighlight, Text } from 'react-native';
const PrimaryButton = ({ onClick, children, buttonStyle, textStyle }) => (
  <TouchableHighlight
    onPress={() => onClick()}
    style={[styles.primaryButton, buttonStyle]}
  >
    <Text style={[styles.primaryButtonText, textStyle]}>{children}</Text>
  </TouchableHighlight>
);

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default PrimaryButton;
