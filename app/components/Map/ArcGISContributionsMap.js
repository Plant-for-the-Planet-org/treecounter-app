import React from 'react';
import PropTypes from 'prop-types';

import MapContributions from './MapContributions';

const ArcGISContributionsMap = ({ userId }) => {
  const webMapId = process.env.MAP_INVENTORY;
  console.log('ArcGISContributionsMap: webMapId', webMapId);
  console.log('ArcGISContributionsMap: userId', userId);
  return (
    <div className="map-container">
      <MapContributions webMapId={webMapId} userId={userId} />
    </div>
  );
};

ArcGISContributionsMap.propTypes = {
  userId: PropTypes.number
};

export default ArcGISContributionsMap;
