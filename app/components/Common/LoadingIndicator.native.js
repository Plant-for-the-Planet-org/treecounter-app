import React from 'react';
import { Image, View } from 'react-native';
import { loadingBar } from '../../assets';
import ContentLoading from '../../components/Common/ContentLoader.native';
import i18n from '../../locales/i18n.js';

const LoadingIndicator = props => {
  const { style, contentLoader, screen } = props;
  return contentLoader ? (
    <ContentLoading screen={screen} />
  ) : (
    <View style={[loadingIndicatorStyle, style]}>
      <Image source={loadingBar} alt={i18n.t('label.loading')} />
    </View>
  );
};

const loadingIndicatorStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

export default LoadingIndicator;
