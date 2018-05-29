import React from 'react';
import PropTypes from 'prop-types';

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
    <div>
      {tpoName && <div>tpoName: {tpoName}</div>}
      <div> projectName: {projectName}</div>
      <div> isCertified: {isCertified ? 'yes' : 'no'}</div>
      <div> projectImage: {projectImage}</div>
    </div>
  );
};

PlantProjectTeaser.propTypes = {
  tpoName: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  isCertified: PropTypes.bool.isRequired,
  projectImage: PropTypes.string
};

export default PlantProjectTeaser;
