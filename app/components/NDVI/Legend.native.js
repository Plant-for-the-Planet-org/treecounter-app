import React from 'react';
import Circle from '../../components/NDVI/Circle.native';
import { View, Text } from 'react-native';
import i18n from '../../locales/i18n.js';
//styles
const LegendInfo = props => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
      <Circle ndviAggregate={{ ...props.ndviAggregate, isColor: true }} />
      <Text style={{ marginLeft: 6, fontSize: 10 }}> {props.title}</Text>
    </View>
  );
};
const Legend = props => {
  return (
    <View
      style={{
        marginTop: 22
      }}
    >
      <Text>{i18n.t('label.NDVI_legend_indicators')}</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
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
