import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const MapContributions = lazy(() => import('./MapContributions'));

import { context } from '../../config';

const ArcGISContributionsMap = ({ userId }) => {
  const webMapId = context.mapIds.inventory;
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
