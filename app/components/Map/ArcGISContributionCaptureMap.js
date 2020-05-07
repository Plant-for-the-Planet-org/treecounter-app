import React from 'react';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import MapContributionCapture from './MapContributionCapture';
import { getWebMapId } from '../../actions/apiRouting';

const ArcGISContributionCaptureMap = ({ geoLocation, onLocationSelected }) => {
  const webMapId = getWebMapId('inventory');
  debug('ArcGISContributionCaptureMap: webMapId', webMapId);
  debug('ArcGISContributionCaptureMap: geoLocation', geoLocation);
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
