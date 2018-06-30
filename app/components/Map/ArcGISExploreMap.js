import React from 'react';
import PropTypes from 'prop-types';

import MapLayerViewer from './MapLayerViewer';

const ArcGISExploreMap = ({ webMapId, layers }) => {
  console.log('ArcGISExploreMap: webMapId', webMapId);
  console.log('ArcGISExploreMap: layers', layers);
  return (
    <div className="map-container">
      <MapLayerViewer webMapId={webMapId} layers={layers} />
    </div>
  );
};

ArcGISExploreMap.propTypes = {
  webMapId: PropTypes.string,
  layers: PropTypes.array
};

export default ArcGISExploreMap;
