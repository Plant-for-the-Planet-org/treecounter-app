import React from 'react';
import PropTypes from 'prop-types';

import MapContributions from './MapContributions';

const ArcGISContributionsMap = ({ webMapId, userId }) => {
  return (
    <div className="map-container">
      <MapContributions webMapId={webMapId} userId={userId} />
    </div>
  );
};

ArcGISContributionsMap.propTypes = {
  webMapId: PropTypes.string.isRequired,
  userId: PropTypes.number
};

export default ArcGISContributionsMap;
