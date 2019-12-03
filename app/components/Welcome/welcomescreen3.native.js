import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import welcomeLogo from '../../assets/images/icons/welcomeLogo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../locales/i18n.js';

const WelcomeScreen3 = ({}) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
  textHeader: {
    fontFamily: 'OpenSans',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153'
  },
  signInBtn: {
    fontWeight: 'bold'
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
  alreadyHaveAccountContainer: {
    width: 312,
    height: 52,
    backgroundColor: 'white',
    borderWidth: 0
  },
  textInputfield: {
    marginTop: 20,
    height: 40,
    width: 200,
    color: '#afacac',
    borderWidth: 1,
    padding: 2,
    backgroundColor: '#f0f2f1',
    textAlign: 'center'
  },
  continueBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});
export default WelcomeScreen3;
