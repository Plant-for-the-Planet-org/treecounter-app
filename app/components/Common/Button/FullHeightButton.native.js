import React from 'react';
import PropTypes from 'prop-types';
import TouchableItem from '../TouchableItem';
import styles from '../../../styles/common/button';
import { Text, Image, View } from 'react-native';
const FullHeightButton = ({
  onClick,
  children,
  buttonStyle,
  textStyle,
  image
}) => (
  <TouchableItem
    activeOpacity={0.6}
    onPress={() => onClick()}
    style={[buttonStyle]}
  >
    <View style={styles.fullHeightButton}>
      <Image
        source={image}
        style={image ? { width: 36, height: 24 } : { width: 0 }}
      />
      <Text style={[styles.primaryButtonText, textStyle]}>{children}</Text>
    </View>
  </TouchableItem>
);

FullHeightButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default FullHeightButton;
