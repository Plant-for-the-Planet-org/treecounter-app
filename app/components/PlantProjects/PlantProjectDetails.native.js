import PropTypes from 'prop-types';

import { context } from '../../../app/config/index';
import { View, Text } from 'react-native';
import VideoContainer from '../../components/Common/VideoContainer';
import React from 'react';
import PlantProjectImageCarousel from './PlantProjectImageCarousel';

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
    return (
      <View style={{ flexDirection: 'column' }}>
        <PlantProjectImageCarousel images={this.props.plantProjectImages} />
        <View
          style={{
            padding: 10,
            paddingTop: 20
          }}
        >
          <Text
            style={{
              textAlign: 'left',
              color: '#686060'
            }}
          >
            {this.props.description}
          </Text>
        </View>
        <View style={{ paddingTop: 20 }}>
          <VideoContainer url={vUrl} />;
        </View>
      </View>
    );
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
