import React from 'react';
import PropTypes from 'prop-types';
import { tick } from '../../assets';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectTeaser
 */
const PlantProjectTeaser = ({
  tpoName,
  projectName,
  isCertified,
  projectImage
}) => {
  return (
    <div className="tpo-fotter-teaser__container">
      <div className="teaser__column">
        <span>
          {projectName}{' '}
          <span>
            {isCertified ? (
              <img className="teaser__certified" src={tick} />
            ) : null}
          </span>
        </span>
        <div className="teaser__tpoName">by {tpoName}</div>
      </div>
      {projectImage ? (
        <img
          className="teaser__projectImage"
          src={projectImage.img}
          alt={projectImage.description}
        />
      ) : null}
    </div>
  );
};

PlantProjectTeaser.propTypes = {
  tpoName: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  isCertified: PropTypes.bool.isRequired,
  projectImage: PropTypes.any
};

export default PlantProjectTeaser;
