import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const TouchableItem = lazy(() => import('../TouchableItem'));

import styles from '../../../styles/common/button';
import { Text, Image, View } from 'react-native';

const SecondaryButton = ({
  onClick,
  children,
  buttonStyle,
  textStyle,
  image
}) => (
  <TouchableItem
    activeOpacity={0.6}
    onPress={() => onClick()}
    style={[styles.primaryButton, styles.secondaryButton, buttonStyle]}
  >
    <View style={styles.textContainer}>
      <Image source={image} style={image ? styles.image : { width: 0 }} />
      <Text style={[styles.primaryButtonText, textStyle]}>{children}</Text>
    </View>
  </TouchableItem>
);

SecondaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default SecondaryButton;
