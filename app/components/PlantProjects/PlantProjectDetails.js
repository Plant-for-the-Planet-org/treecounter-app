import React from 'react';
import PropTypes from 'prop-types';

import UserSynopsis from '../Common/UserSynopsis';
import UserHomepageLink from '../Common/UserHomepageLink';
import ImageCarousel from './ImageCarousel';

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
  projectImages,
  videoUrl
  // mapData
}) => {
  return (
    <div className="plantproject-details__container">
      <ImageCarousel projectImages={projectImages} />
      <UserSynopsis synopsis1={synopsis1} synopsis2={synopsis2} />
      {homepageUrl && (
        <UserHomepageLink homepageUrl={homepageUrl} caption={homepageCaption} />
      )}

      {videoUrl && <VideoContainer videoUrl={videoUrl} />}
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
  projectImages: PropTypes.array
};

export default PlantProjectDetails;
