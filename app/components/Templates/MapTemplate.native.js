import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import mapTemplateStyle from '../../styles/mapTemplate.native';

export function MapTemplate(locals) {
  return (
    <View style={mapTemplateStyle.mapContainer}>
      <PrimaryButton
        onClick={() => {
          navigator.geolocation.getCurrentPosition(location => {
            let { latitude, longitude } = location.coords;
            locals.onChange(
              'geoLongitude=' + longitude + '&geoLatitude=' + latitude
            );
          });
        }}
      >
        Get Device Location
      </PrimaryButton>
      <Text>Maps under construction</Text>
      <Text>
        {'Latitude: ' +
          locals.value.split('geoLatitude=')[1] +
          ', Longitude: ' +
          locals.value.split('&')[0].split('=')[1]}
      </Text>
    </View>
  );
}
