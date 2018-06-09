import React from 'react';
import PropTypes from 'prop-types';

import MapContributions from './MapContributions';

const ArcGISContributionsMap = ({ webMapId, userId }) => {
  const style = {
    backgroundColor: '#EEEEEE',
    width: '500px',
    height: '300px',
    padding: '25px',
    marginTop: '20px'
  };
  return (
    <div style={style}>
      <MapContributions webMapId={webMapId} userId={userId} />
    </div>
  );
};

ArcGISContributionsMap.propTypes = {
  webMapId: PropTypes.string.isRequired,
  userId: PropTypes.number
};

export default ArcGISContributionsMap;
