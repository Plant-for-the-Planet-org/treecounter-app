import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { avatar } from './../../assets';
import i18n from '../../locales/i18n';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.updateMainView}>
        <Image source={avatar} style={styles.updateImage} />
        <Text style={styles.updateTitle}>
          {' '}
          {i18n.t('label.updateRequired')}{' '}
        </Text>
        <Text style={styles.updatePara}> {i18n.t('label.updatePara')} </Text>
        <TouchableOpacity style={styles.updateButtonStyle}>
          <Text style={styles.updateButtonText}>
            {Platform.OS === 'ios'
              ? i18n.t('label.openAppStore')
              : i18n.t('label.openPlayStore')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updateMainView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 54
  },
  updateImage: {
    width: 150,
    height: 150
  },
  updatePara: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153',
    marginHorizontal: 44,
    marginTop: 7
  },
  updateButtonStyle: {
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a',
    width: '86%',
    justifyContent: 'center',
    marginTop: 132
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});
