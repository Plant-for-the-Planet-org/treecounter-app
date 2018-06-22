import React from 'react';
import Map from '../Common/EsriMap/Map';

export function MapTemplate(locals) {
  locals.onChange('geoLongitude=1&geoLatitude=1&country=DE'); //Temporary fix
  return <Map />;
}
