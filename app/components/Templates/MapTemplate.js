import React from 'react';
import MapContributionCapture from '../Map/MapContributionCapture';
import RegistrationMap from '../../components/RegisterTrees/RegistrationMap';

export function parseGeolocation(geoLocation) {
  let geolocationObj = {};
  try {
    geolocationObj = JSON.parse(
      '{"' +
        decodeURI(geoLocation)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (err) {
    console.log(err);
  }
  return geolocationObj;
}

export function MapTemplate(locals) {
  console.log('%%%%%%%%%%%%%%%%%%%%', locals);
  //  locals.onChange(); //Temporary fix
  let geolocation = parseGeolocation(locals.value);

  return (
    <RegistrationMap
      geoLocation={geolocation}
      onGeoLocationSelected={newValue => {
        console.log('handle map change', newValue);
        newValue['country'] = newValue.countryCode;
        delete newValue.countryCode;
        let valueString = Object.keys(newValue)
          .map(key => key + '=' + newValue[key])
          .join('&');
        //change value object into queryParams

        locals.onChange(valueString);
      }}
    />
  );
}
