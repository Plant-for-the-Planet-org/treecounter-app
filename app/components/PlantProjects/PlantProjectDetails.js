import React from 'react';
import PropTypes from 'prop-types';

import UserSynopsis from '../Common/UserSynopsis';
import UserHomepageLink from '../Common/UserHomepageLink';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';

import { context } from '../../../app/config/index';
import VideoContainer from '../Common/VideoContainer';
// import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectDetails
 */
const PlantProjectDetails = ({
  description,
  homepageUrl,
  homepageCaption,
  plantProjectImages,
  videoUrl,
  mapData
}) => {
  if (context.debug && !videoUrl) {
    videoUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
  }
  return (
    <div className="plant-project-details__container">
      <PlantProjectImageCarousel projectImages={plantProjectImages} />
      <UserSynopsis synopsis1={description} />
      {homepageUrl && (
        <UserHomepageLink homepageUrl={homepageUrl} caption={homepageCaption} />
      )}
      {videoUrl && <VideoContainer url={videoUrl} />}
    </div>
  );
};

PlantProjectDetails.propTypes = {
  description: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array
};

export default PlantProjectDetails;
