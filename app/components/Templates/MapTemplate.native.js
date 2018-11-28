import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import mapTemplateStyle from '../../styles/mapTemplate.native';

export function MapTemplate(locals) {
  let latitude, longitude;
  return (
    <View style={mapTemplateStyle.mapContainer}>
      <PrimaryButton
        onClick={() => {
          navigator.geolocation.getCurrentPosition(location => {
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;
            locals.onChange(
              'geoLongitude=' + longitude + '&geoLatitude=' + latitude
            );
          });
        }}
      >
        Get Device Location
      </PrimaryButton>
      <Text>Maps under construction</Text>
      <Text>{'Latitude: ' + latitude + ', Longitude: ' + longitude}</Text>
    </View>
  );
}
