import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/WelcomeScreens/WelcomeScreen4';

const WelcomeScreen4 = ({}) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.crossContainer}>
        <Icon name="remove" size={25} color="#89b53a" />
      </View>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {i18n.t('label.welcome_scrn_4_heading')}
        </Text>
        <View style={styles.zeroPercentComissionContainer}>
          <View style={styles.zeroPercentContainer}>
            <Text style={styles.zeroStyle}>0</Text>
            <Text style={styles.percentStyle}>%</Text>
          </View>
          <View>
            <Text style={styles.commisionStyle}>
              {i18n.t('label.welcome_scrn_4_commision')}
            </Text>
          </View>
        </View>
        <Text style={styles.textPara}>
          {i18n.t('label.welcome_scrn_4_sub_heading')}
        </Text>
      </View>
      <View style={{ height: 130 }}>
        <View style={styles.bottomRow}>
          <PrimaryButton buttonStyle={styles.buttonStyle}>
            <Text style={styles.continueBtn}>
              {i18n.t('label.welcome_scrn_4_continue')}
            </Text>
          </PrimaryButton>
        </View>
        <View style={styles.bottomRow}>
          <PrimaryButton buttonStyle={styles.lowerBtnStyle}>
            <Text style={styles.lowerTextStyle}>
              {i18n.t('label.welcome_scrn_4_already_have_an_account')}
              <Text style={styles.signInBtn}>
                {i18n.t('label.welcome_scrn_4_sign_in')}
              </Text>
            </Text>
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen4;
