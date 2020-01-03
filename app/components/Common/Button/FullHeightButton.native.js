import React from 'react';
import PropTypes from 'prop-types';
import TouchableItem from '../TouchableItem';
import styles from '../../../styles/common/button';
import { Text, Image, View } from 'react-native';
const FullHeightButton = ({ onClick, children, image }) => (
  <TouchableItem activeOpacity={0.6} onPress={() => onClick()}>
    <View style={styles.fullHeightButton}>
      <Text style={[styles.primaryButtonText]}>{children}</Text>
      <Image
        source={image}
        style={image ? { width: 24, height: 24 } : { width: 0 }}
      />
    </View>
  </TouchableItem>
);

FullHeightButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default FullHeightButton;
