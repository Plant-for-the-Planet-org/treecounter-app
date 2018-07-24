import React from 'react';
import { MapPinRed, MapPinBlue, MapPinGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import i18n from '../../locales/i18n.js';
import { Text, View, Image } from 'react-native';

const ContributionsMapLegend = () => (
  <View className="user-contributions__location--icons">
    <Image
      className="user-contributions__location--icons--img"
      source={MapPinRed}
    />
    <Text>{i18n.t('label.singleTree')}</Text>
    <Image
      className="user-contributions__location--icons--img"
      source={MapPinBlue}
    />
    <Text>{i18n.t('label.severalTrees')}</Text>
    <Image
      className="user-contributions__location--icons--img"
      source={MapPinGreen}
    />
    <Text>{i18n.t('label.donatedTrees')}</Text>
  </View>
);

export default ContributionsMapLegend;
