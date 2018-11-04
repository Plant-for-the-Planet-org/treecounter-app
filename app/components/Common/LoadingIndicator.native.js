import React from 'react';
import { Image, View } from 'react-native';
import { loadingBar } from '../../assets';
import i18n from '../../locales/i18n.js';
import { Dimensions } from 'react-native';

const LoadingIndicator = () => (
  <View style={loadingIndicatorStyle}>
    <Image source={loadingBar} alt={i18n.t('label.loading')} />
  </View>
);

const loadingIndicatorStyle = {
  flex: 1,
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

export default LoadingIndicator;
