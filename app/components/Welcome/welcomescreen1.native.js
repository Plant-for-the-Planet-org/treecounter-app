import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { treelogo } from '../../assets';

const WelcomeScreen1 = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.crossContainer}>
        <Icon name="remove" size={25} color="#89b53a" />
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
      <View style={styles.dotsContainer}>
        <View style={styles.activeDot} />
        <View style={styles.inActiveDot} />
        <View style={styles.inActiveDot} />
        <View style={styles.inActiveDot} />
      </View>
      <View style={styles.bottomRow}>
        <PrimaryButton buttonStyle={styles.buttonStyle}>
          <Text style={styles.gettingStartedBtn}>
            {i18n.t('label.welcome_scrn_1_get_started_btn')}
          </Text>
        </PrimaryButton>
      </View>
      <View style={styles.bottomRow2}>
        <PrimaryButton buttonStyle={styles.buttonStyle2}>
          <Text style={styles.alreadyHaveAccountBtn}>
            {i18n.t('label.welcome_scrn_1_already_have_an_account')}
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
  crossContainer: {
    borderColor: 'red',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  textHeader: {
    fontFamily: 'OpenSans',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 33,
    textAlign: 'center',
    color: '#4d5153',
    marginVertical: 30
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  textPara: {
    fontFamily: 'OpenSans',
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4d5153'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomRow2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  buttonStyle: {
    width: 312,
    height: 52,
    borderRadius: 100
  },
  buttonStyle2: {
    width: 312,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  gettingStartedBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  },
  alreadyHaveAccountBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#87b738'
  }
});
export default WelcomeScreen1;
