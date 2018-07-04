import React from 'react';
import PropTypes from 'prop-types';

import MapContributionCapture from './MapContributionCapture';

const ArcGISContributionCaptureMap = ({ geoLocation, onLocationSelected }) => {
  return (
    <div className="map-container">
      <MapContributionCapture
        geoLocation={geoLocation}
        onLocationSelected={onLocationSelected}
      />
    </div>
  );
};

ArcGISContributionCaptureMap.propTypes = {
  geoLocation: PropTypes.object,
  onLocationSelected: PropTypes.func.isRequired
};

export default ArcGISContributionCaptureMap;
