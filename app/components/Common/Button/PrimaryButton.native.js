import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../../styles/common/button.native';
import { TouchableHighlight, Text } from 'react-native';
const PrimaryButton = ({ onClick, children }) => (
  <TouchableHighlight onPress={() => onClick()} style={styles.button}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableHighlight>
);

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default PrimaryButton;
