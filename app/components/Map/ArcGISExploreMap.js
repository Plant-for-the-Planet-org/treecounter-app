import React from 'react';
import PropTypes from 'prop-types';

import MapLayerViewer from './MapLayerViewer';

const ArcGISExploreMap = ({ webMapId, layers }) => {
  console.log('ArcGISExploreMap: webMapId', webMapId);
  console.log('ArcGISExploreMap: layers', layers);
  const style = {
    backgroundColor: '#EEEEEE',
    width: '100%',
    height: '300px',
    padding: '25px',
    marginTop: '20px',
    boxSizing: 'border-box'
  };
  return (
    <div style={style}>
      <MapLayerViewer webMapId={webMapId} layers={layers} />
    </div>
  );
};

ArcGISExploreMap.propTypes = {
  webMapId: PropTypes.string,
  layers: PropTypes.array
};

export default ArcGISExploreMap;
