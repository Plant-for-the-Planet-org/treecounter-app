import React from 'react';
import Circle from '../../components/NDVI/Circle.native';
import { View, Text } from 'react-native';
import i18n from '../../locales/i18n.js';
//styles
import styles from '../../styles/NDVI/Legend';

const LegendInfo = props => {
  return (
    <View style={styles.legendInfoContainer}>
      <Circle ndviAggregate={{ ...props.ndviAggregate, isColor: true }} />
      <Text style={styles.legendInfoText}> {props.title}</Text>
    </View>
  );
};

const Legend = () => {
  return (
    <View style={styles.legendContainer}>
      <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
        {i18n.t('label.NDVI_legend_indicators')}
      </Text>
      <View style={styles.legendWrapper}>
        {/* indicatorsSpell={}
          grasslandsSpell={i18n.t('label.NDVI_legend_grasslands')}
          rockSandSnowSpell={i18n.t('label.NDVI_legend_rock_sand_snow')}
          waterSpell={i18n.t('label.NDVI_legend_water')}
          denseVegetationSpell={i18n.t('label.NDVI_legend_dense_vegetation')} */}
        <LegendInfo
          ndviAggregate={{ min: '#3a8adb', max: '#a5dce3' }}
          title={i18n.t('label.NDVI_legend_water')}
        />
        <LegendInfo
          ndviAggregate={{ min: '#ea9c07', max: '#ea9c07' }}
          title={i18n.t('label.NDVI_legend_rock_sand_snow')}
        />
        <LegendInfo
          ndviAggregate={{ min: '#c2ea69', max: '#cee3a5' }}
          title={i18n.t('label.NDVI_legend_grasslands')}
        />
        <LegendInfo
          ndviAggregate={{ min: '#7ba32e', max: '#43600b' }}
          title={i18n.t('label.NDVI_legend_dense_vegetation')}
        />
      </View>
    </View>
  );
};

export default Legend;
