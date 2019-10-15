import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { gift_icon } from '../../assets';
import TouchableItem from '../Common/TouchableItem.native';
import styles from '../../styles/public-page';

const SupportButton = ({ onRegisterSupporter }) => {
  return (
    <TouchableItem
      activeOpacity={0.6}
      style={styles.giftIcon}
      onPress={() => onRegisterSupporter()}
    >
      <Image source={gift_icon} onClick={() => onRegisterSupporter()} />
    </TouchableItem>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func
};
export default SupportButton;
