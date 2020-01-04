import { Text, View } from 'react-native';
import React from 'react';
import mapTemplateStyle from '../../styles/mapTemplate.native';
import MapboxMap from '../Map/NativeMapView.native';

export function MapTemplate(locals) {
  let errorBlockStyle = locals.stylesheet && locals.stylesheet.
    errorBlock;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  const borderStyle = locals.hasError
    ? {
        borderWidth: 2,
        borderColor: 'red'
      }
    : {};
  return (
    <View style={[mapTemplateStyle.mapContainer, borderStyle]}>
      <MapboxMap
        ref={ref => (this.mapBox = ref)}
        mapStyle={{
          height: 200
          // borderRedius: 5
        }}
      />
      {/* <Text>{i18n.t('label.map_under_construction')}</Text> */}
      {error}
    </View>
  );
}
