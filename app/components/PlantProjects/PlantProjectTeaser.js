import React from 'react';
import PropTypes from 'prop-types';
import { tick } from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n.js';

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
    <div className="project-teaser__container">
      <div className="column">
        <span className="teaser__tpoHeading">
          {projectName}{' '}
          <span>
            {isCertified ? (
              <img className="teaser__certified" src={tick} />
            ) : null}
          </span>
        </span>
        <div className="teaser__tpoName">
          {i18n.t('label.comp_by_name', { ownername: tpoName })}
        </div>
      </div>
      {projectImage ? (
        <div className="teaser-image__container">
          <img
            className="teaser__projectImage"
            src={getImageUrl('project', 'large', projectImage.image)}
            alt={projectImage.description}
          />
        </div>
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
