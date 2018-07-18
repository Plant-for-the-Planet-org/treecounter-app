import React from 'react';
import ArcGISContributionCaptureMap from '../Map/ArcGISContributionCaptureMap';
import { objectToQueryParams, queryParamsToObject } from '../../helpers/utils';

export function MapTemplate(locals) {
  let geolocation = queryParamsToObject(locals.value);

  return (
    <ArcGISContributionCaptureMap
      geoLocation={geolocation}
      onLocationSelected={newValue => {
        newValue['country'] = newValue.countryCode;
        delete newValue.countryCode;
        let valueString = objectToQueryParams(newValue);

        locals.onChange(valueString);
      }}
    />
  );
}
