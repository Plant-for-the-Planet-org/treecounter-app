import React from 'react';
import MapContributionCapture from '../Map/MapContributionCapture';

export function MapTemplate(locals) {
  console.log('%%%%%%%%%%%%%%%%%%%% '.locals);
  //  locals.onChange(); //Temporary fix
  return (
    <MapContributionCapture
      geoLocation={'geoLongitude=1&geoLatitude=1&country=DE'}
      onLocationSelected={locals.onChange}
    />
  );
}
