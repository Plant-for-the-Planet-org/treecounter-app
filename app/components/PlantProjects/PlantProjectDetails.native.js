import PropTypes from 'prop-types';

import { context } from '../../../app/config/index';
import { View, Text } from 'react-native';
import VideoContainer from '../../components/Common/VideoContainer';
import React from 'react';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectDetails
 */
class PlantProjectDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let vUrl = this.props.videoUrl;
    if (context.debug && !this.props.videoUrl) {
      vUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
    }
    return <VideoContainer url={vUrl} />;
  }
}

PlantProjectDetails.propTypes = {
  description: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array
};

export default PlantProjectDetails;
