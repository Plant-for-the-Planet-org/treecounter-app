import { Text, View } from 'react-native';
import React from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import mapTemplateStyle from '../../styles/mapTemplate.native';
import { NotificationManager } from '../../notification/PopupNotificaiton/notificationManager';
import i18n from '../../locales/i18n.js';

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
          request(
            Platform.select({
              android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            })
          ).then((/*response*/) => {
            Geolocation.getCurrentPosition(
              location => {
                let { latitude, longitude } = location.coords;
                locals.onChange(
                  'geoLongitude=' + longitude + '&geoLatitude=' + latitude
                );
              },
              (/*location*/) => {
                NotificationManager.error(
                  i18n.t('label.location_permission_denied'),
                  i18n.t('label.error'),
                  5000
                );
              }
            );
          });
        }}
      >
        {i18n.t('label.get_device_location')}
      </PrimaryButton>
      <Text>{i18n.t('label.map_under_construction')}</Text>
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
