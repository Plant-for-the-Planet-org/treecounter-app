import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { gift_icon } from '../../assets';

import styles from '../../styles/public-page';

const SupportButton = ({ active, isUserLoggedIn, onRegisterSupporter }) => {
  return (
    <View style={styles.giftIcon}>
      <Image
        source={gift_icon}
        onClick={() =>
          isUserLoggedIn && active ? onRegisterSupporter() : null
        }
      />
    </View>
  );
};

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func
};
export default SupportButton;
