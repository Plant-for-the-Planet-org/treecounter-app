import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import welcomeLogo from '../../assets/images/icons/welcomeLogo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../locales/i18n.js';

const WelcomeScreen4 = ({}) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
      <View style={styles.dotsContainer}>
        <View style={styles.activeDot} />
        <View style={styles.inActiveDot} />
        <View style={styles.inActiveDot} />
        <View style={styles.inActiveDot} />
      </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  inActiveDot: {
    width: 7,
    height: 7,
    backgroundColor: '#e6e9ec',
    marginHorizontal: 5,
    borderRadius: 5
  },
  activeDot: {
    width: 7,
    height: 7,
    backgroundColor: '#89b53a',
    marginHorizontal: 5,
    borderRadius: 5
  },
  signInBtn: {
    fontWeight: 'bold'
  },
  zeroPercentComissionContainer: {
    marginVertical: 20
  },
  crossContainer: {
    borderColor: 'red',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  zeroPercentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100
  },
  commisionStyle: {
    fontFamily: 'OpenSans',
    fontSize: 24,
    fontWeight: '300',
    color: '#87b738'
  },
  zeroStyle: {
    fontFamily: 'OpenSans',
    fontSize: 90,
    color: '#87b738'
  },
  percentStyle: {
    fontFamily: 'OpenSans',
    fontSize: 40,
    lineHeight: 122,
    color: '#87b738'
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
  lowerTextStyle: {
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
  textInputfield: {
    marginTop: 20,
    height: 40,
    width: 200,
    color: '#afacac',
    // borderColor: '$primary',
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
export default WelcomeScreen4;
