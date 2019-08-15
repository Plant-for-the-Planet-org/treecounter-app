import PropTypes from 'prop-types';
import React from 'react';
import { activePlantProjectPerTPO } from './activePlantProjectPerTPO';

const ActivePlantProjectData = props => {
  return (
    <div
      id="carousel-example-generic"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {Object.keys(
          activePlantProjectPerTPO(
            props.userTpos,
            props.plantProjects,
            props.id
          )
        ).map((k, index) => (
          <li
            data-target="#carousel-example-generic"
            data-slide-to={index}
            key={index}
          />
        ))}
      </ol>

      <div className="carousel-inner" role="listbox">
        {activePlantProjectPerTPO(
          props.userTpos,
          props.plantProjects,
          props.id
        )}
      </div>
    </div>
  );
};

ActivePlantProjectData.propTypes = {
  userTpos: PropTypes.any.isRequired,
  plantProjects: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired
};

export default ActivePlantProjectData;
