import React from 'react'

const PlantedDetails = ({personal, community}) => <div className="fixed-planted-details" >
  <strong>{personal}</strong> Planted by the personal
    <br />
  <strong>{community}</strong> Planted by community
</div>;

export default PlantedDetails;
