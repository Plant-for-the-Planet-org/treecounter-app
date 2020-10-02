import React from 'react';
import PropTypes from 'prop-types';
//import { debug } from '../../debug';
import MapContributions from './MapContributions';
import { getWebMapId } from '../../actions/apiRouting';

const ArcGISContributionsMap = ({ userId }) => {
  const webMapId = getWebMapId('inventory');
  //debug('ArcGISContributionsMap: webMapId', webMapId);
  //debug('ArcGISContributionsMap: userId', userId);
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
