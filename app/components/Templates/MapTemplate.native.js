import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import mapTemplateStyle from '../../styles/mapTemplate.native';

export function MapTemplate(locals) {
  return (
    <View style={mapTemplateStyle.mapContainer}>
      <PrimaryButton
        onClick={() => {
          locals.onChange(
            'geoLongitude=76.74475009999871&geoLatitude=76.74475009999871&country=IN'
          );
        }}
      >
        Default Location
      </PrimaryButton>
      <Text>Maps under construction</Text>
    </View>
  );
}
