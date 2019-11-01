import React from 'react';
import { Image, View, Text } from 'react-native';
import { loadingBar } from '../../assets';
import i18n from '../../locales/i18n.js';

const LoadingIndicator = (style, contentLoader) =>
  contentLoader ? (
    <Text>ssss</Text>
  ) : (
    <View style={[loadingIndicatorStyle, style]}>
      <Image source={loadingBar} alt={i18n.t('label.loading')} />
    </View>
  );

// const LoadingIndicator = () => (
//   <div id="loading-indicator" style={loadingIndicatorStyle} className="active">
//     <img src={loadingBar} alt={i18n.t('label.loading')} />
//   </div>
// );

const loadingIndicatorStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

export default LoadingIndicator;
