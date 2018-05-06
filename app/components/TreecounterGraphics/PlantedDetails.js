import React from 'react';
import PropTypes from 'prop-types';

const PlantedDetails = ({ personal, community }) => (
  <div className="fixed-planted-details">
    <strong>{personal}</strong> Planted by the personal
    <br />
    <strong>{community}</strong> Planted by community
  </div>
);

export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired
};
