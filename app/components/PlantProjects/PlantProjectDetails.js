import React from 'react';
import PropTypes from 'prop-types';

import UserSynopsis from '../Common/UserSynopsis';
import UserHomepageLink from '../Common/UserHomepageLink';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';

import { context } from '../../../app/config/index';
import VideoContainer from '../Common/VideoContainer';
// import ArcGISPlantProjectsMap from '../ArcGISMaps/ArcGISPlantProjectsMap';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectDetails
 */
const PlantProjectDetails = ({
  synopsis1,
  synopsis2,
  homepageUrl,
  homepageCaption,
  plantProjectImages,
  videoUrl
  // mapData
}) => {
  if (context.debug && !videoUrl) {
    videoUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
  }
  return (
    <div className="plant-project-details__container">
      <PlantProjectImageCarousel projectImages={plantProjectImages} />
      <UserSynopsis synopsis1={synopsis1} synopsis2={synopsis2} />
      {homepageUrl && (
        <UserHomepageLink homepageUrl={homepageUrl} caption={homepageCaption} />
      )}
      {videoUrl && <VideoContainer url={videoUrl} />}
      {/* <ArcGISPlantProjectsMap mapData={mapData} /> */}
    </div>
  );
};

PlantProjectDetails.propTypes = {
  synopsis1: PropTypes.string,
  synopsis2: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array
};

export default PlantProjectDetails;
