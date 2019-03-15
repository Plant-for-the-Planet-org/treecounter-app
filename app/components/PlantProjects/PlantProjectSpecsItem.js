import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const PlantProjectSpecsItem = ({ label, value, icon, rightIcon }) => {
  return (
    <div className="project-specs__item">
      <span className="align-center">
        {icon ? <img src={icon} /> : null}
        <span>{label}</span>
        {rightIcon ? (
          <div className="tooltip">
            <a data-tip data-for="survival-rate">
              <img src={rightIcon} />
            </a>

            <ReactTooltip id="survival-rate" effect="solid" type="dark">
              <span className="tooltip-text">
                Percentage of planted trees that survive the first year after
                planting.
              </span>
            </ReactTooltip>
          </div>
        ) : null}
      </span>
      <span>
        {typeof value == 'number'
          ? parseFloat(value).toLocaleString('en')
          : value}
      </span>
    </div>
  );
};

PlantProjectSpecsItem.propTypes = {
  icon: PropTypes.any,
  rightIcon: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.string
};

export default PlantProjectSpecsItem;
