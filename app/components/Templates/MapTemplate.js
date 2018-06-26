import React from 'react';
import MapContributionCapture from '../Map/MapContributionCapture';
import RegistrationMap from '../../components/RegisterTrees/RegistrationMap';

export function MapTemplate(locals) {
  console.log('%%%%%%%%%%%%%%%%%%%% ', locals);
  //  locals.onChange(); //Temporary fix
  return (
    <RegistrationMap onGeoLocationSelected={locals.onChange} />
    // <MapContributionCapture
    //   geoLocation={{ geoLongitude: 1, geoLatitude: 1, country: 'DE' }}
    //   onLocationSelected={locals.onChange}
    // />
  );
}
