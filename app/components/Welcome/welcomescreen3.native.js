import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { WelcomeImage3 } from '../../assets/index';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/WelcomeScreens/WelcomeScreen3';

const WelcomeScreen3 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_3_heading')}
        </Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={WelcomeImage3}
        />
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_3_sub_heading')}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen3;
