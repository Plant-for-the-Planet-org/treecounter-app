import React from 'react';
import PropTypes from 'prop-types';

const PlantProject = ({ taxDeductableIn }) => {
  return <div>tax deductable in: taxDeductableIn.join()</div>;
};

PlantProject.propTypes = {
  taxDeductableIn: PropTypes.array.isRequired
};

export default PlantProject;
