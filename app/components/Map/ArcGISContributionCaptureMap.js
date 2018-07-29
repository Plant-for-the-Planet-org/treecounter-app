import React from 'react';
import PropTypes from 'prop-types';

import MapContributionCapture from './MapContributionCapture';

import { context } from '../../config';

const ArcGISContributionCaptureMap = ({ geoLocation, onLocationSelected }) => {
  const webMapId = context.mapIds.inventory;
  console.log('ArcGISContributionCaptureMap: webMapId', webMapId);
  console.log('ArcGISContributionCaptureMap: geoLocation', geoLocation);
  return (
    <div className="map-container">
      <MapContributionCapture
        geoLocation={geoLocation}
        onLocationSelected={onLocationSelected}
        webMapId={webMapId}
      />
    </div>
  );
};

ArcGISContributionCaptureMap.propTypes = {
  geoLocation: PropTypes.object,
  onLocationSelected: PropTypes.func.isRequired
};

export default ArcGISContributionCaptureMap;
