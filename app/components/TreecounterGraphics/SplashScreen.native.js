import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Linking
} from 'react-native';
import TouchableItem from './../Common/TouchableItem.native';
import { avatar, update } from './../../assets';
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

        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://itunes.apple.com/app/id1444740626&mt=8')
            }
            style={styles.updateButtonStyle}
          >
            <Text style={styles.updateButtonText}>
              {i18n.t('label.openAppStore')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=org.pftp'
              )
            }
            style={styles.updateButtonStyle}
          >
            <Text style={styles.updateButtonText}>
              {i18n.t('label.openPlayStore')}
            </Text>
          </TouchableOpacity>
        )}
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
    position: 'absolute',
    bottom: '7%'
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
