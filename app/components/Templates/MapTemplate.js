import React from 'react';
import ArcGISContributionCaptureMap from '../Map/ArcGISContributionCaptureMap';

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
    console.log(
      '%%%%%%%%%%%%%%%%%%%% parseGeolocation: ',
      geoLocation,
      geolocationObj
    );
  } catch (err) {
    console.log(err);
  }
  return geolocationObj;
}

export function MapTemplate(locals) {
  console.log('%%%%%%%%%%%%%%%%%%%%', locals);
  let geolocation = parseGeolocation(locals.value);

  return (
    <ArcGISContributionCaptureMap
      geoLocation={geolocation}
      onLocationSelected={newValue => {
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
