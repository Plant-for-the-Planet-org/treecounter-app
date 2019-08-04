import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View } from 'react-native';
import { loadingBar } from '../../assets/svgAssets';
import i18n from '../../locales/i18n.js';

const LoadingIndicator = style => (
  <View style={[loadingIndicatorStyle, style]}>
    <SvgUri width="100" height="100" svgXmlData={loadingBar} />
  </View>
);

const loadingIndicatorStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

export default LoadingIndicator;
