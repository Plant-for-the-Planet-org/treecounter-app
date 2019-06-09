import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import mapTemplateStyle from '../../styles/mapTemplate.native';

export function MapTemplate(locals) {
  let errorBlockStyle = locals.stylesheet && locals.stylesheet.errorBlock;
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
        {/* {console.log(locals.value.split('geoLatitude=')[1])}
        {console.log(locals.value.split('&')[0].split('=')[1])} */}
        {'Latitude: ' +
          (locals.value.split('geoLatitude=')[1]
            ? parseFloat(locals.value.split('geoLatitude=')[1]).toFixed(2)
            : locals.value.split('geoLatitude=')[1]) +
          ', Longitude: ' +
          (locals.value.split('&')[0].split('=')[1]
            ? parseFloat(locals.value.split('&')[0].split('=')[1]).toFixed(2)
            : locals.value.split('&')[0].split('=')[1])}
      </Text>
      {error}
    </View>
  );
}
