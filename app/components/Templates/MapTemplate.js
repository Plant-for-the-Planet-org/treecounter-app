import React from 'react';
import MapContributionCapture from '../Map/MapContributionCapture';
import RegistrationMap from '../../components/RegisterTrees/RegistrationMap';

export function MapTemplate(locals) {
  console.log('%%%%%%%%%%%%%%%%%%%%', locals);
  //  locals.onChange(); //Temporary fix
  let geolocation = {};
  try {
    geolocation = JSON.parse(
      '{"' +
        decodeURI(locals.value)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (err) {
    console.error(err);
  }
  return (
    <RegistrationMap
      geoLocation={geolocation}
      onGeoLocationSelected={newValue => {
        console.log('handle map change', value);
        //change value object into queryParams
        //call locals.onChange(value);
      }}
    />
  );
}
