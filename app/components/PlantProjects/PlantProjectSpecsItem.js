import React from 'react';
import PropTypes from 'prop-types';

const PlantProjectSpecsItem = ({ label, value, icon, rightIcon }) => {
  return (
    <div className="project-specs__item">
      <span className="align-center">
        {icon ? <img src={icon} /> : null}
        <span>{label}</span>
        {rightIcon ? <img src={rightIcon} /> : null}
      </span>
      <span>{value}</span>
    </div>
  );
};

PlantProjectSpecsItem.propTypes = {
  icon: PropTypes.string,
  rightIcon: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string
};

export default PlantProjectSpecsItem;
