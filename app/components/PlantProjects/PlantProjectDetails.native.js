import React from 'react';
import PropTypes from 'prop-types';

import { context } from '../../../app/config/index';
import { View, Text } from 'react-native';
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
    <View style={{ width: '100%', height: 20, color: 'black' }}>
      <Text>Dummy content</Text>
    </View>
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
