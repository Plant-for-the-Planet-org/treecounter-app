import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import welcomeLogo from '../../assets/images/icons/welcomeLogo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../locales/i18n.js';

const WelcomeScreen5 = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.crossContainer}>
        <Icon name="remove" size={25} color="#89b53a" />
      </View>
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
      <View style={styles.bottomRow}>
        <PrimaryButton buttonStyle={styles.buttonStyle}>
          <Text style={styles.continueBtn}>
            {' '}
            {i18n.t('label.welcome_scrn_5_create_an_account')}
          </Text>
        </PrimaryButton>
      </View>
      <View style={styles.bottomRow}>
        <PrimaryButton buttonStyle={styles.lowerBtnStyle}>
          <Text style={styles.alreadyHaveAccountBtn}>
            {i18n.t('label.welcome_scrn_5_already_have_an_account')}
            <Text style={styles.signInBtn}>
              {i18n.t('label.welcome_scrn_5_sign_in')}
            </Text>
          </Text>
        </PrimaryButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  crossContainer: {
    borderColor: 'red',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  signInBtn: {
    fontWeight: 'bold'
  },
  textHeader: {
    fontFamily: 'OpenSans',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153'
  },
  imageStyle: {
    width: 200,
    height: 200
  },
  textPara: {
    fontFamily: 'OpenSans',
    fontSize: 20,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonStyle: {
    width: 312,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a'
  },
  alreadyHaveAccountBtn: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: '#4d5153'
  },
  lowerBtnStyle: {
    width: 312,
    height: 52,
    backgroundColor: 'white',
    borderWidth: 0
  },
  continueBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});
export default WelcomeScreen5;
