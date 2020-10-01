import React from 'react';
import PropTypes from 'prop-types';
//import { debug } from '../../debug';
import MapLayerViewer from './MapLayerViewer';

const ArcGISExploreMap = ({ webMapId, layers }) => {
  //debug('ArcGISExploreMap: webMapId', webMapId);
  //debug('ArcGISExploreMap: layers', layers);
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
