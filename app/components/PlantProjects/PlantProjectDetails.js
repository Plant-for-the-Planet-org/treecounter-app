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
class PlantProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showVideo: false };
  }
  handleClick() {
    this.setState({ showVideo: true });
  }
  toggleVideoDialog() {
    this.setState({ showVideo: false });
  }
  render() {
    let {
      description,
      homepageUrl,
      homepageCaption,
      plantProjectImages,
      videoUrl,
      mapData
    } = this.props;
    if (!videoUrl) {
      videoUrl = 'https://www.youtube.com/embed/XJ3p5TAjH30';
    }
    return (
      <div className="plant-project-details__container">
        <PlantProjectImageCarousel
          projectImages={plantProjectImages}
          carousalImageClick={this.props.onImageClick}
        />
        <UserSynopsis synopsis1={description} />
        {homepageUrl && (
          <UserHomepageLink
            homepageUrl={homepageUrl}
            caption={homepageCaption}
          />
        )}

        {videoUrl && (
          <div className="video-link">
            <a onClick={this.handleClick.bind(this)}>{videoUrl}</a>
          </div>
        )}
        <VideoContainer
          isOpen={this.state.showVideo}
          onRequestClose={this.toggleVideoDialog.bind(this)}
          url={videoUrl}
        />
      </div>
    );
  }
}

PlantProjectDetails.propTypes = {
  description: PropTypes.string,
  homepageUrl: PropTypes.string,
  homepageCaption: PropTypes.string,
  videoUrl: PropTypes.string,
  mapData: PropTypes.object,
  plantProjectImages: PropTypes.array,
  onImageClick: PropTypes.func
};

export default PlantProjectDetails;
