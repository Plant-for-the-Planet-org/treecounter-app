import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import welcomeLogo from '../../assets/images/icons/welcomeLogo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/WelcomeScreens/WelcomeScreen3';

const WelcomeScreen3 = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.crossContainer}>
        <Icon name="remove" size={25} color="#89b53a" />
      </View>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_3_heading')}
        </Text>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={welcomeLogo}
        />
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_3_sub_heading')}
        </Text>
      </View>
      <View style={{ height: 130 }}>
        <View style={styles.bottomRow}>
          <PrimaryButton buttonStyle={styles.buttonStyle}>
            <Text style={styles.continueBtn}>
              {i18n.t('label.welcome_scrn_3_continue')}
            </Text>
          </PrimaryButton>
        </View>
        <View style={styles.bottomRow}>
          <PrimaryButton buttonStyle={styles.alreadyHaveAccountContainer}>
            <Text style={styles.alreadyHaveAccountBtn}>
              {i18n.t('label.welcome_scrn_3_already_have_an_account')}
              <Text style={styles.signInBtn}>
                {i18n.t('label.welcome_scrn_3_sign_in')}
              </Text>
            </Text>
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen3;
