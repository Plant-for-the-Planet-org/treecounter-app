import React from 'react';
import { MapPinRed, MapPinBlue, MapPinGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import i18n from '../../locales/i18n.js';
import { Text, View, Image } from 'react-native';
import styles from '../../styles/myTrees/my_trees.native';

const ContributionsMapLegend = () => (
  <View style={styles.contributionMapLegend}>
    <Image source={MapPinRed} style={styles.image} />
    <Text style={styles.text}>{i18n.t('label.singleTree')}</Text>
    <Image source={MapPinBlue} style={styles.image} />
    <Text style={styles.text}>{i18n.t('label.severalTrees')}</Text>
    <Image source={MapPinGreen} style={styles.image} />
    <Text style={styles.text}>{i18n.t('label.donatedTrees')}</Text>
  </View>
);

export default ContributionsMapLegend;
