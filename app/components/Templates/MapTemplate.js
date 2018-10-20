import React from 'react';
import ArcGISContributionCaptureMap from '../Map/ArcGISContributionCaptureMap';
import { objectToQueryParams, queryParamsToObject } from '../../helpers/utils';

export function MapTemplate(locals) {
  let geolocation = queryParamsToObject(locals.value);

  let error = locals.hasError;
  return (
    <div className={error ? 'map-template__error' : ''}>
      <ArcGISContributionCaptureMap
        geoLocation={geolocation}
        onLocationSelected={newValue => {
          newValue['country'] = newValue.countryCode;
          delete newValue.countryCode;
          let valueString = objectToQueryParams(newValue);

          locals.onChange(valueString);
        }}
      />
      <div className="map-template__error-disc">
        {error && locals.error ? locals.error : null}
      </div>
    </div>
  );
}
