import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Linking
} from 'react-native';
import styles from '../../styles/splashScreen.native';
import { planetLogo } from './../../assets';
import { context } from '../../config';
import i18n from '../../locales/i18n';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.updateMainView}>
        <Image source={planetLogo} style={styles.updateImage} />
        <Text style={styles.updateTitle}>
          {' '}
          {i18n.t('label.updateRequired')}{' '}
        </Text>
        <Text style={styles.updateExplanation}> {i18n.t('label.updateExplanation')} </Text>

        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://apps.apple.com/app/plant-for-the-planet/id${context['ios'].appId}`)
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
                `https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=${context['android'].appId}`
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
