import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Projects } from '../../assets/index';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/WelcomeScreens/WelcomeScreen2';

const WelcomeScreen2 = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_2_heading')}
        </Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={Projects}
        />
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_2_sub_heading')}
        </Text>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen2;
