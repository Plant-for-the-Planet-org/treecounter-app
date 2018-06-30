import React from 'react';
import PropTypes from 'prop-types';

import MapContributionCapture from './MapContributionCapture';

const ArcGISContributionCaptureMap = ({ geoLocation, onLocationSelected }) => {
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
      {
        // <div>Display a Map and put a marker at the location specified by props.geoLocation</div>
        // <div>When the user clicks on the map or enters an address, call the function provided by props.onLocationSelected and pass a location object .
        // </div>
        // <br/>
        // <div>countryCode: {geoLocation.countryCode}</div>
        // <div>geoLongitude: {geoLocation.geoLongitude}</div>
        // <div>geoLatitude: {geoLocation.geoLatitude}</div>
      }
      <MapContributionCapture
        geoLocation={geoLocation}
        onLocationSelected={onLocationSelected}
      />
      <br />
      <br />
      <div>countryCode: {geoLocation.country}</div>
      <div>geoLongitude: {geoLocation.geoLongitude}</div>
      <div>geoLatitude: {geoLocation.geoLatitude}</div>
    </div>
  );
};

ArcGISContributionCaptureMap.propTypes = {
  geoLocation: PropTypes.object,
  onLocationSelected: PropTypes.func.isRequired
};

export default ArcGISContributionCaptureMap;
