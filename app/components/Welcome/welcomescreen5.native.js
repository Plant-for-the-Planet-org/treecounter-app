import React from 'react';
import { Text, View, Image } from 'react-native';
import welcomeLogo from '../../assets/images/icons/welcomeLogo.png';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/WelcomeScreens/WelcomeScreen5';

const WelcomeScreen5 = ({}) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_5_heading')}
        </Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={welcomeLogo}
        />
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_5_sub_heading')}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen5;
