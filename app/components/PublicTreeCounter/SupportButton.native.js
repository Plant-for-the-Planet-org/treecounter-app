import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { gift_icon } from '../../assets';
import TouchableItem from '../Common/TouchableItem.native';
import styles from '../../styles/public-page';

const SupportButton = ({ active, isUserLoggedIn, onRegisterSupporter }) => {
  return (
    <TouchableItem
      activeOpacity={0.6}
      style={styles.giftIcon}
      onPress={() => onRegisterSupporter()}
    >
      <Image
        source={gift_icon}
        onClick={() => (true ? onRegisterSupporter() : null)}
      />
    </TouchableItem>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func
};
export default SupportButton;
