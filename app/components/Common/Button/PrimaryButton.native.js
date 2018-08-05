import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../../styles/common/button';
import { TouchableHighlight, Text, Image, View } from 'react-native';
const PrimaryButton = ({
  onClick,
  children,
  buttonStyle,
  textStyle,
  image
}) => (
  <TouchableHighlight
    onPress={() => onClick()}
    style={[styles.primaryButton, buttonStyle]}
  >
    <View style={styles.textContainer}>
      <Image source={image} style={image ? styles.image : { width: 0 }} />
      <Text style={[styles.primaryButtonText, textStyle]}>{children}</Text>
    </View>
  </TouchableHighlight>
);

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default PrimaryButton;
