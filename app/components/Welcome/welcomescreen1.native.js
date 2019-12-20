import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';
import { treelogo } from '../../assets';
import styles from '../../styles/WelcomeScreens/WelcomeScreen1';

const WelcomeScreen1 = ({ _appHomePage }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.openAsGuestContainer}>
        <Text style={styles.openAsGuest} onPress={_appHomePage}>
          {i18n.t('label.welcome_scrn_1_open_as_guest')}
        </Text>
      </View>
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={treelogo}
        />
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_1_heading')}
        </Text>
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_1_sub_heading')}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen1;
