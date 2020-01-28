import React from 'react';
import PropTypes from 'prop-types';
import TouchableItem from '../TouchableItem';
import styles from '../../../styles/common/button';
import { Text, Image, View } from 'react-native';
const PrimaryButton = ({
  onClick,
  children,
  buttonStyle,
  textStyle,
  image
}) => (
  <TouchableItem
    activeOpacity={0.6}
    onPress={() => onClick()}
    style={[styles.roundButton, buttonStyle]}
  >
    <View style={styles.textContainer}>
      <Image source={image} style={image ? styles.image : { width: 0 }} />
      <Text style={[styles.primaryButtonText, textStyle]}>{children}</Text>
    </View>
  </TouchableItem>
);

PrimaryButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default PrimaryButton;
